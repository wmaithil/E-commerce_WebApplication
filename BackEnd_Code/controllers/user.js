
const User = require("../models/user")
const Order = require("../models/order");

exports.getUserById= (req, res , next, id)=>{
    User.findById(id).exec((err,user) => {
        if(err ){
            return res.status(400).json({
                error: "No User found !"
            });
        };
        req.profile = user;
    }); 
    next(); 
}; 

exports.getUser= (req, res) => {
    //Filtering profile values
    req.profile.salt =undefined
    req.profile.encry_password = undefined

    //"Undefined" removes the fields that are undefined
    return res.json(req.profile);
};

exports.updateUser= (req, res )=>{

    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set: req.body},
        {new: true, useFindAndModify: false },
        (err, user)=>{
            if(err){
                return res.status(400).json({
                    error: "Not Authorised to Update User !"
                });
            } //end if 
            user.salt = undefined  
            user.encry_password = undefined   
            return res.json(user);
 
        } //end call back 
        ); 
}; 

exports.userPurchaseList = (req, res)=>{
    Order.find({user: req.profile._id })
    .populate("user","_id name")
    .exec((err, order) => {
        if(err){
            return res.status(400).json({
                error: "No orders found"
            });
        }
        return res.json(order);
    })
    
};

exports.pushOrdersInPurchaseList= (req,res,next)=>{
    let purchases=[]
    req.body.order.products.forEach(product => {
        purchases.push({
            _id:product._id,
            name: product.name,
            description : product.description,
            category : product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id : req.body.order.transaction_id
        });
    });
    // store purchases in Db
    User.findOneAndUpdate(
    {_id:req.profile._id},
    {$push: {purchases: purchases}},
    {new: true},
    (err,purchases)=>{
        if(err){
            return res.status(400).json({
                error: " Unable to save purchasess"
            });
        }
        next();
    }
    );
};
 
