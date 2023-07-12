
const mongoose= require("mongoose");
const {ObjectId} = mongoose.Schema;


const productSchema= new mongoose.Schema({
    name: {
        type:String,
        required:true,
        trim: true,
        maxlength:32,
        unique: true
    },
    description: {
        type:String,
        required:true,
        trim: true,
        maxlength:2000,
    },
    price: {
        type:Number,
        required:true,
        trim: true,
        maxlength:32,
    },
    category : {
        type: ObjectId,
        ref: "Category",
        required: true
    },
    stock: {
        type:String,
    },
    variety:{
        colorTypes:[],
        sizeAvailable:["Small","Medium","Large"]
    },
    sold:{
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    }
},
    {timestamps : true}

);

module.exports = mongoose.model("Product",productSchema);