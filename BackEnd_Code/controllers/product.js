const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { sortBy } = require("lodash");

exports.getProductById = (req,res,next,id)=>{
    Product.findById(id)
    .populate("category")
    .exec((err,product)=>{
        if(err){
            return res.status(400).json({
                error : "No ProductFound"
            });
        }
        req.product = product;
        next();
    });
};

exports.createProduct = (req,res) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true
    
    form.parse(req, (err, fields,file)=>{
        if(err){
            return res.status(400).json({
                error : "problem with image"
            });
        }
        //DESTRUCTURING FIELDS
        const {name, description, category ,price, stock} = fields;

        if( !name || !description|| !price||!category|| !stock ){
            return res.status(400).json({
                error: "Some Fields are missing"
            });
        }

        let product = new Product(fields);        

        //file handling
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error : "File size is too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        } 
        console.log("Product newly Created is =>", product);

        //save to db
        product.save((err,product)=>{
            if(err ){
                return res.status(400).json({
                    error : "unable to save photo in DB"
                });
            }
            res.json(product); 
        });
});

};


exports.getProduct = (req,res) => {
        req.product.photo = undefined
        return res.json(req.product)
};

//middleware 
exports.photo = (req,res, next) => {
    if(req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next();
};

exports.deleteProduct = (req,res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if(err)
        {
            return res.status(400).json({
                error : "Unable to delete product"
            });
        }

        res.json({
            message : "product deleted",
            deletedProduct
        });

    });
};

exports.updateProduct = (req,res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    
    form.parse(req, (err, fields,file)=>{
        if(err){
            return res.status(400).json({
                error : "problem with image"
            });
        }
        
        let product = req.product;
        product = _.extend(product, fields)

        //file handling
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error : "File size is too big"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path)
        } 
        //save to db
        product.save((err,product)=>{
            if(err || !product){
                return res.status(400).json({
                    error : "unable to Update photo in DB"
                });
            }
            console.log("Updated Product", product);
            res.json(product);
        });
    });
};

exports.getAllProducts = (req,res) => {

    let limit= req.query.limit ? parseInt(req.query.limit): 8;
    let sortBy = req.query.SortBy ? req.query.SortBy : "_id";

    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
        if(err || !products){
            return res.status(400).json({
                error: "No products found"
            });
        }
        //if close 
        res.json(products);
    });
};

exports.getAllUniqueCategories = (req,res)=>{
    Product.distinct("category", {}, (err,category)=>{
        if(err){
            return res.status(400).json({
                error:"No categories found"
            });
        }
        res.json(category)
    });
};

exports.updateStock = (req,res, next)=>{

    let myOperations= req.body.products.map(prod =>{

        return {
            updateOne: {
                filter: {_id: prod._id},
                update: {$inc: {stock: -prod.count, sold: +prod.count}}
            }
        }
    })

    Product.bulkWrite(myOperations, {} , (err,products)=>{
        if(err){
            return res.status(400).json({
                error:"Bulk operations failed"
            });
        }

        next();
    });

};