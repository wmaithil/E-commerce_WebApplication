
var express = require("express");
var router = express.Router();
const {signout, signup, signin, isSignedIn} = require("../controllers/auth");

const { check } = require('express-validator');

router.post(
    "/signup",
    [
        check('name', "name should be atleast 3 characters").isLength({ min: 3}),
        check('email',"email field is required").isEmail(),
        check('password',"password should be atleast 5 characters").isLength({ min: 5 })
    ],
signup);

router.post(
    "/signin",
    [
        check('email',"email field is required").isEmail(),
        check('password',"password field is required min 5 characters").isLength({ min: 5 })
    ],
signin);

router.get("/signout",signout);

router.get("/testroute", isSignedIn,(req, res)=>{
    res.json(req.auth);
});

module.exports = router;
