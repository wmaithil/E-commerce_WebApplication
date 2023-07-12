const express= require("express");
const router= express.Router();

const { isAuthenticated, isSignedIn, isAdmin} = require("../controllers/auth");
const { pushOrdersInPurchaseList, getUserById} = require("../controllers/user");
const {updateStock} = require("../controllers/product");
const {createOrder, getOrderById, getAllOrders, updateStatus,getOrderStatus} = require("../controllers/order");

//params
router.param("userId", getUserById);

router.param("orderId", getOrderById);

//actualroutes
router.post("/order/create/:userId", isSignedIn ,isAuthenticated, 
            pushOrdersInPurchaseList , updateStock, createOrder);

router.get("/order/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders)

//
router.get("/order/status/:userId",isSignedIn,isAuthenticated,isAdmin, getOrderStatus );
router.put("/order/:orderId/status/:userId", isSignedIn,isAuthenticated,isAdmin, updateStatus);

module.exports = router;
