const CartItem = require("../models/cartItem.model")
const userService = require("../services/user.service")
const productService = require("../services/product.service")


async function updateCartItem(userId, cartItemId, cartItemData){
    try {
        const item = await findCartItemById(cartItemId)

        const user = await userService.findUserById(item.userId)

        const product = await productService.findProductById(item.product)

        if(!user){
            throw new Error("user not found : ", userId)
        }

        if(user._id.toString() === userId.toString()){
            item.quantity = cartItemData.quantity
            // item.price = item.quantity * product.price
            item.discountedPrice = item.quantity * product.discountedPrice
            const updateCartItem = await item.save()
            
            return updateCartItem
        }
        else{
            throw new Error("you can't update this cart item")
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

async function removeCartItem(userId,cartItemId){
    const cartItem = await findCartItemById(cartItemId)
    const user = await userService.findUserById(userId)

    if(user._id.toString() === cartItem.userId.toString()){
        return await CartItem.findByIdAndDelete(cartItemId)
    }
    throw new Error("you can't remove another user's item")
}

async function findCartItemById(cartItemId){

    const cartItem = await CartItem.findById(cartItemId).populate("product")

    if(cartItem){
        return cartItem
    }
    else{
        throw new Error("cartitem not found with id ", cartItemId)
    }
}

module.exports={updateCartItem, removeCartItem, findCartItemById}