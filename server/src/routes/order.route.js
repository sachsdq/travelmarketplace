const express = require("express")
const router = express.Router()

const orderController = require("../controller/order.controller")
const authenticate = require("../middleware/authenticate")

router.post("/",authenticate,orderController.createOrder)
router.get("/user",authenticate,orderController.orderHistory)
router.get("/user/cancelled",authenticate,orderController.getOrderCancelled)
router.get("/user/delivered",authenticate,orderController.getOrderDelivered)
router.get("/user/shipped",authenticate,orderController.getOrderShipped)
router.get("/:id",authenticate,orderController.findOrderById)
router.get("/",authenticate,orderController.getAllOrders)
router.get("/status",authenticate,orderController.getOrderByStatus)
router.get("/all",authenticate,orderController.getAllOrderByStatus)
router.put("/updateStt",authenticate,orderController.updateOrderStatus)
router.put("/placed/:id",authenticate,orderController.placeOrder)
router.put("/confirmed/:id",authenticate,orderController.confirmedOrder)
router.put("/ship/:id",authenticate,orderController.shipOrder)
router.put("/delivered/:id",authenticate,orderController.deliverOrder)
router.put("/cancelled/:id",authenticate,orderController.cancelledOrder)

module.exports = router