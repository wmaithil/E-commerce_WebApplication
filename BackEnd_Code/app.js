require('dotenv').config();
const express = require("express");
const app = express();
const mongoose =require("mongoose");
const bodyParser= require("body-parser");
const cookieParser= require("cookie-parser");
const cors= require("cors");

//authentication Routes
const authRoutes =require("./routes/auth");
//User Routes
const userRoutes = require("./routes/user");
//Category routes
const categoryRoutes = require("./routes/category");
//Product routes
const productRoutes= require("./routes/product");
const orderRoutes= require("./routes/order");
const paymentBRoutes= require("./routes/payment");
//Database connection

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{
    console.log("DB CONNECTED :)")
});


//Middlewares

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My routes
app.use("/api", authRoutes );
app.use("/api", userRoutes );
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/app",paymentBRoutes);
//port
const port = process.env.PORT || 8000;

//Starting Server
app.listen(port, () => {
    console.log(`App is runnning at ${port}`)
});


