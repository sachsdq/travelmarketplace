const mongoose = require("mongoose")

const cartItemsSchema = new mongoose.Schema({
    cart:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "carts",
            required:true
        }
    ,
    product:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
            required:true
        }
    ,
    size:{
        type: String,
        // required:true
    },
    quantity:{
        type: Number,
        required:true,
        default:1
    },
    price:{
        type: Number,
        required:true,
        default:0
    },
    discountedPrice:{
        type: Number,
        required:true,
        default:0
    },
    userId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"users",
            required:true
        }
    
})

const CartItem = mongoose.model("cartItems", cartItemsSchema)

module.exports=CartItem