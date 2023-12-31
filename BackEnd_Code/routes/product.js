const express= require("express");

const router= express.Router();

const {getProductById, createProduct, getProduct,photo,
    deleteProduct , updateProduct, getAllProducts , getAllUniqueCategories} = require("../controllers/product");

const {isAdmin , isSignedIn , isAuthenticated} = require("../controllers/auth");
const {getUserById } = require("../controllers/user");

router.param("productId", getProductById);
router.param("userId", getUserById);

router.post("/product/create/:userId", 
            isSignedIn,
            isAuthenticated, 
            isAdmin, 
            createProduct);

router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

router.put("/product/:productId/:userId",
    isSignedIn,
    isAuthenticated, 
    isAdmin, 
    updateProduct);

router.delete("/product/:productId/:userId",
    isSignedIn,
    isAuthenticated, 
    isAdmin, 
    deleteProduct );

router.get("/products", getAllProducts);

router.get("/products/categories", getAllUniqueCategories);

module.exports = router;