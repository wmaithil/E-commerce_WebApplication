
const User= require("../models/user");
const {  validationResult } = require('express-validator');
var expressJwt = require("express-jwt")
var jwt = require("jsonwebtoken")


exports.signin =(req,res)=>{
    const {email,password } = req.body; 
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg,
         error_spotted_at :errors.array()[0].param });
    };

    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "User does not exist"
            });
        };

        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and Password doesnot match"
            });
        };
        //Create token
        const token = jwt.sign({_id: user.id}, process.env.SECRET);

        res.cookie("token",token,{expire : new Date()+ 9999});

        const {_id, name , email , role} =user;
        return res.json({token, user:{_id,name,email, role}})

    })
};

exports.signup=(req,res)=>{
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg,
         error_spotted_at :errors.array()[0].param });
    };

    const user = new User(req.body);

    user.save((err, user) => {
        if (err){
            return res.status(400).json({
                error: "User not saved in db!"
            });
        };
        res.json({
            name:user.name,
            email:user.email,
            id: user._id
        });
    });
};

exports.signout = (req,res)=>{
    res.clearCookie("token"); 
    res.json({
        message:"user signout success"
    });
};

//protected rotes
exports.isSignedIn = expressJwt({
    secret : process.env.SECRET,
    userProperty :  "auth"
});

exports.isAuthenticated = (req, res , next)=>{
        let checker = req.profile && req.auth && req.profile._id == req.auth._id;
        if(!checker){
            return res.status(403).json({
                error : "access denied"
            });
        } 
        next();
};

exports.isAdmin= (req , res , next)=> {
    if(req.profile.role === 0){
        return res.status(403).json({
            error: "Admin Access required"
        })
    };
    
    next();
};
