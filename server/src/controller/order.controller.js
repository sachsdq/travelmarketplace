const orderService = require("../services/order.service")

const createOrder = async(req,res)=>{
    const user = await req.user
    const { shipAddress, selectedCartItemIds } = req.body;
    console.log("user,shipAddress,selectedCartItemIds controller: ",user,shipAddress,selectedCartItemIds)
    try {
        let createdOrder = await orderService.createOrder(user, shipAddress, selectedCartItemIds)
        // user,req.body

        return res.status(201).send(createdOrder)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const findOrderById = async(req,res)=>{
    const orderId = await req.params.id
    try {
        const order = await orderService.findOrderById(orderId)
        return res.status(200).send(order)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const getAllOrders = async(req,res)=>{
    try {
        const order = await orderService.getAllOrders()
        return res.status(200).send(order)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const orderHistory = async(req,res)=>{
    const user = await req.user
    // const orderId = await req.params.id
    try {
        const order = await orderService.usersOrderHistory(user?._id) //user._id
        // console.log("user id order ",user?._id)
        // console.log("order history ",order)
        return res.status(200).send(order)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const getOrderCancelled = async(req,res)=>{
    const user = await req.user
    try {
        const order = await orderService.getOrderCancelled(user?._id)
        // console.log("order history ",order)
        return res.status(200).send(order)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const getOrderDelivered = async(req,res)=>{
    const user = await req.user
    try {
        const order = await orderService.getOrderDelivered(user?._id)
        // console.log("order history ",order)
        return res.status(200).send(order)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const getOrderShipped = async(req,res)=>{
    const user = await req.user
    try {
        const order = await orderService.getOrderShipped(user?._id)
        // console.log("order history ",order)
        return res.status(200).send(order)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const updateOrderStatus = async (req, res) => {
    
    try {
      const {newStatus } = req.body;
      const orderId = await req.params.id
      const updatedOrder = await updateOrderStatus(orderId, newStatus);
      return res.status(200).send(updatedOrder);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  };

const placeOrder = async(req,res)=>{
    const orderId = req.params.id
    try {
        const order = await orderService.placeOrder(orderId)
        return res.status(200).send(order)
    } catch (error) {
        return res.status(500).send({error: error.message})
    }
}

const confirmedOrder = async(req,res)=>{
    const orderId = req.params.id
    try {
        const order = await orderService.confirmedOrder(orderId)
        return res.status(200).send(order)
    } catch (error) {
        return res.status(500).send({error: error.message})
    }
}

const shipOrder = async(req,res)=>{
    const orderId = req.params.id
    try {
        const order = await orderService.shipOrder(orderId)
        return res.status(200).send(order)
    } catch (error) {
        return res.status(500).send({error: error.message})
    }
}

const deliverOrder = async(req,res)=>{
    const orderId = req.params.id
    try {
        const order = await orderService.deliverOrder(orderId)
        return res.status(200).send(order)
    } catch (error) {
        return res.status(500).send({error: error.message})
    }
}

const cancelledOrder = async(req,res)=>{
    const orderId = req.params.id
    try {
        const order = await orderService.cancelledOrder(orderId)
        return res.status(200).send(order)
    } catch (error) {
        return res.status(500).send({error: error.message})
    }
}

const getOrderByStatus = async(req,res)=>{
    const user = await req.user
    try {
        const order = await orderService.getOrderByStatus(user?._id,req.query)
        return res.status(200).send(order)
    } catch (error) {
        return res.status(500).send({error: error.message})
    }
}

const getAllOrderByStatus = async(req,res)=>{
    const orderId = req.params.id
    try {
        const order = await orderService.getOrderByStatus(req.query)
        
        console.log("order theo status: ",order)
        return res.status(200).send(order)
    } catch (error) {
        return res.status(500).send({error: error.message})
    }
}

module.exports = {
    createOrder,
    findOrderById,
    getAllOrders,
    orderHistory,
    getOrderCancelled,
    getOrderDelivered,
    getOrderShipped,
    updateOrderStatus,
    placeOrder,
    confirmedOrder,
    shipOrder,
    deliverOrder,
    cancelledOrder,
    getOrderByStatus,
    getAllOrderByStatus
}