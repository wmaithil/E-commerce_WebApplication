

const Category= require("../models/category");

exports.getCategoryById= (req, res, next,id) => {

    Category.findById(id).exec((err , category) => {
        if(err){
            return res.status(400).json({
                error : "Categories not Found"
            })
        }
        req.category = category;
        next(); 
    });
};

exports.createCategory = (req,res) => {
    const category = new Category(req.body);
    category.save((err, category)=> {
        if(err){
            return res.status(400).json({   
                error : "Not able to save"
            });
        }
        res.json({category});
    });
};

exports.getCategory= (req,res)=>{
    return res.json(req.category);
};

exports.getAllCategory= (req,res)=>{
    //get all categories
    Category.find().exec((err,items)=>{
        if(err){
            return res.status(400).json({
                error : "Not able to fetch categories"
            });
        }
        res.json( items );
    });
};

exports.updateCategory = (req,res) => {
    const category = req.category;
    category.name =req.body.name;

    category.save((err,updatedCategory)=>{
        if(err){
            return res.status(400).json({
                error : "Not able to update categories"
            });
        }
        res.json(updatedCategory);
    });
};

exports.removeCategory = (req,res) => {
    const category = req.category;
    category.remove((err,category)=>{
        if(err){
            return res.status(400).json({
                error : "Failed to delete category"
            });
        }
        res.json({
            message: "Deleted Successfully"
        })
    });
};