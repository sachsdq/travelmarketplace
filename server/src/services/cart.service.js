const CartItem = require("../models/cartItem.model")
const Product = require("../models/product.model")
const Cart = require("../models/cart.model")


async function createCart(user){
    try {
        const cart = new Cart({user})
        const createdCart = await cart.save()
        return createdCart
    } catch (error) {
        throw new Error(error.message)
    }
}

async function getAllCart(){
    try {
        const cart =  Cart.find()
        return cart
    } catch (error) {
        throw new Error(error.message)
    }
}

async function findUserCart(userId){
    try {
        // const newCart = await createCart(userId)

        let cart = await Cart.findOne({user:userId})

        let cartItems = await CartItem.find({cart:cart?._id}).populate("product")

        cart.cartItems = cartItems

        let totalPrice = 0
        let totalDiscountedPrice = 0
        let totalItem = 0

        for(let cartItem of cart.cartItems){
            totalPrice+=cartItem.price
            totalDiscountedPrice+=cartItem.discountedPrice
            totalItem+=cartItem.quantity
        }

        cart.totalPrice = totalPrice
        cart.totalItem = totalItem
        cart.totalDiscountedPrice = totalDiscountedPrice
        cart.discount = totalPrice-totalDiscountedPrice


        await cart.save()
        return cart
    } catch (error) {
        throw new Error(error.message)
    }
}

async function addCartItem(userId, req){
    try {
        const newCart = await createCart(userId)
        const cart = await Cart.findOne({user:userId})
        const product = await Product.findById(req.productId)

        if (cart !== null) {
            console.log(cart.cartItems);
          } else {
            console.log("Không tìm thấy giỏ hàng");
          }

        const isPresent = await CartItem.findOne({cart:cart?._id, product:product?._id, userId})

        if(!isPresent){
            const cartItem = new CartItem({
                product:product?._id,
                cart:cart?._id,
                quantity:1,
                userId,
                price:product.price,
                // size:req.size,
                discountedPrice:product.discountedPrice
            })

            const createdCartItem = await cartItem.save()
            cart.cartItems.push(createdCartItem)
            await cart.save()
            return "Item added to cart"
        }
    } catch (error) {
        throw new Error(error.message)
    }
}



module.exports={createCart, getAllCart, findUserCart, addCartItem}