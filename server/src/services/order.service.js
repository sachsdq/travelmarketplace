const Address = require("../models/address.model")
const cartService = require("../services/cart.service")
const Order = require("../models/order.model")
const OrderItem = require("../models/orderItems.model")

// async function createOrder(user, shipAddress){
//     let address

//     if(shipAddress._id){
//         let existAddress = await Address.findById(shipAddress._id)
//         address = existAddress
//     }
//     else{
//         address = new Address(shipAddress)
//         address.user = user
//         await address.save()

//         user.address.push(address)
//         await user.save()
//     }

//     const cart = await cartService.findUserCart(user._id)
//     const orderItems = []

//     for(const item of cart.cartItems){
//         const orderItem = new OrderItem({
//             price: item.price,
//             product: item.product,
//             quantity: item.quantity,
//             // size: item.size,
//             userId: item.userId,
//             discountedPrice: item.discountedPrice,
//         })

//         const createdOrderItem = await orderItem.save()
//         orderItems.push(createdOrderItem)
//     }

//     const createdOrder = new Order({
//         user,
//         orderItems,
//         totalPrice:cart.totalPrice,
//         totalDiscountedPrice:cart.totalDiscountedPrice,
//         discount:cart.discount,
//         totalItem:cart.totalItem,
//         shippingAddress:address,
//     })

//     const savedOrder = await createdOrder.save()

//     return savedOrder
// }

async function createOrder(user, shipAddress, selectedCartItemIds) {
    let address;
    console.log("user, shipAddress, selectedCartItemIds: ",{user, shipAddress, selectedCartItemIds})
  
    if (shipAddress._id) {
      let existAddress = await Address.findById(shipAddress._id);
      address = existAddress;
    } else {
      address = new Address(shipAddress);
      address.user = user;
      await address.save();
  
      user.address.push(address);
      await user.save();
    }
  
    const cart = await cartService.findUserCart(user._id);
    const orderItems = [];
  
    for (const item of cart.cartItems) {
      if (selectedCartItemIds.includes(item._id.toString())) {
        const orderItem = new OrderItem({
          price: item.price,
          product: item.product,
          quantity: item.quantity,
          // size: item.size,
          userId: item.userId,
          discountedPrice: item.discountedPrice,
        });
  
        const createdOrderItem = await orderItem.save();
        orderItems.push(createdOrderItem);
      }
    }

    // Tính toán tổng giá trị đơn hàng và tổng giá trị sau khi giảm giá
    const totalPrice = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalDiscountedPrice = orderItems.reduce((total, item) => total + item.discountedPrice * item.quantity, 0);

    // Tính toán giá trị giảm giá
    const discount = totalPrice - totalDiscountedPrice;
  
    const createdOrder = new Order({
      user,
      orderItems,
      totalPrice: totalPrice,
      totalDiscountedPrice: totalDiscountedPrice,
      discount: discount,
      totalItem: orderItems.length,
      shippingAddress: address,
    });
    const savedOrder = await createdOrder.save();
  
    return savedOrder;
  }

// async function updateOrderStatus(orderId,reqQuery){
//     let {orderStatus} = reqQuery
//     let order = await Order.find().populate("orderStatus")

//     console.log("order status: ",orderStatus)
//     if(orderStatus){
//         order = order.where("orderStatus").equals(order?.orderStatus)

//         if(orderStatus==="PLACED"){
//             order.orderStatus = await placeOrder(orderId)
//         }else if(orderStatus==="CONFIRMED"){
//             order.orderStatus = await confirmedOrder(orderId)
//         }else if(orderStatus==="SHIPPED"){
//             order.orderStatus = await shipOrder(orderId)
//         }else if(orderStatus==="DELIVERED"){
//             order.orderStatus = await deliverOrder(orderId)
//         }else if(orderStatus==="CANCELLED"){
//             order.orderStatus = await cancelledOrder(orderId)
//         }else{
//             return "trang thái đơn hàng chưa được thay đổi"
//         }
//     }else{
//         return "không nhận được order status nào"
//     }
    
//     const updateStatus = await order.exec()

//     return await updateStatus.save()
// }

// async function updateOrderStatus(orderId,reqData){
//     const order = await Order.findByIdAndUpdate(orderId,reqData)
//     // const order = await placeOrder(orderId)

//     return await order.save()
// }

async function updateOrderStatus(orderId, newStatus) {
    const order = await findOrderById(orderId);
  
    switch (newStatus) {
      case "PLACED":
        order.orderStatus = "PLACED";
        order.paymentDetails.paymentStatus = "COMPLETED";
        break;
      case "CONFIRMED":
        order.orderStatus = "CONFIRMED";
        break;
      case "SHIPPED":
        order.orderStatus = "SHIPPED";
        break;
      case "DELIVERED":
        order.orderStatus = "DELIVERED";
        break;
      case "CANCELLED":
        order.orderStatus = "CANCELLED";
        break;
      default:
        throw new Error("Invalid order status");
    }
  
    await order.save();
    return order;
  }

async function placeOrder(orderId){
    const order = await findOrderById(orderId)

    order.orderStatus = "PLACED"
    order.paymentDetails.paymentStatus = "COMPLETED"

    return await order.save()
}

async function confirmedOrder(orderId){
    const order = await findOrderById(orderId)

    order.orderStatus = "CONFIRMED"

    return await order.save()
}

async function shipOrder(orderId){
    const order = await findOrderById(orderId)

    order.orderStatus = "SHIPPED"

    return await order.save()
}

async function deliverOrder(orderId){
    const order = await findOrderById(orderId)

    order.orderStatus = "DELIVERED"

    return await order.save()
}

async function cancelledOrder(orderId){
    const order = await findOrderById(orderId)

    order.orderStatus = "CANCELLED"

    return await order.save()
}

async function findOrderById(orderId){
    const order = await Order.findById(orderId)
    .populate("user")
    .populate({path:"orderItems",populate:{path:"product"}})
    .populate("shippingAddress")

    await order.save()

    return order
}

// async function findOrderById(userId){
//     const order = await Order.findOne({user:userId})
//     const orderItem = await Order.find({orderItems:order?._id})
//     .populate("user")
//     .populate({path:"orderItems",populate:{path:"product"}})
//     .populate("shippingAddress")

//     return order
// }

async function usersOrderHistory(userId){
    try {
        const order = await Order.find({user:userId,orderStatus:"PLACED"})
        .populate({path:"orderItems",populate:{path:"product"}})
        .lean()

        return order
    } catch (error) {
        throw new Error(error.message)
    }
}

async function getOrderCancelled(userId){
    try {
        const order = await Order.find({user:userId,orderStatus:"CANCELLED"})
        .populate({path:"orderItems",populate:{path:"product"}})
        .lean()

        return order
    } catch (error) {
        throw new Error(error.message)
    }
}

async function getOrderDelivered(userId){
  try {
      const order = await Order.find({user:userId,orderStatus:"DELIVERED"})
      .populate({path:"orderItems",populate:{path:"product"}})
      .lean()

      return order
  } catch (error) {
      throw new Error(error.message)
  }
}

async function getOrderShipped(userId){
  try {
      const order = await Order.find({user:userId,orderStatus:"SHIPPED"})
      .populate({path:"orderItems",populate:{path:"product"}})
      .lean()

      return order
  } catch (error) {
      throw new Error(error.message)
  }
}

async function getAllOrders(){
    try {
        const order =  await Order.find()
        .populate({path:"orderItems",populate:{path:"product"}}).lean()
        return order
    } catch (error) {
        throw new Error(error.message)
    }
}

async function getAllOrdersByStatus(reqQuery){
    let {status} = reqQuery
    let order = await getAllOrders()

    if(status){
        order = order.findOne({orderStatus:status})
        // .populate("orderStatus")
    } else{
        console.log("k tim thay status")
        return order
    }

    const orders = await order.exec()
    return orders
}

async function deleteOrder(orderId){
    const order = await findOrderById(orderId)
    await Order.findByIdAndDelete(order._id)
}

module.exports = {
    createOrder,
    updateOrderStatus,
    placeOrder, 
    confirmedOrder, 
    shipOrder, 
    deliverOrder, 
    cancelledOrder, 
    getOrderCancelled,
    findOrderById, 
    usersOrderHistory,
    getOrderCancelled,
    getOrderDelivered,
    getOrderShipped,
    getAllOrders, 
    getAllOrdersByStatus,
    deleteOrder
}