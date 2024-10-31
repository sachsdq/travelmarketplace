const express = require("express")

const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res)=>{
    return res.status(200).send({message: "welcome to travel market place api - node", status:true})
})

const authRouters = require("./routes/auth.route")
app.use("/auth", authRouters)

const userRouters = require("./routes/user.route")
app.use("/api/users", userRouters)

const productRouter = require("./routes/product.route")
app.use("/api/products", productRouter)

const adminProductRouter = require("./routes/adminProduct.route")
app.use("/api/admin/products", adminProductRouter)

const cartRouter = require("./routes/cart.route")
app.use("/api/cart", cartRouter)

const cartItemRouter = require("./routes/cartItem.route")
app.use("/api/cart_items", cartItemRouter)

const orderRouter = require("./routes/order.route")
app.use("/api/orders",orderRouter)

const adminOrderRouter = require("./routes/adminOrder.route")
app.use("/api/admin/orders",adminOrderRouter)

const addressRouter = require("./routes/address.route")
app.use("/api/address",addressRouter)

const reviewRouter = require("./routes/review.route")
app.use("/api/reviews", reviewRouter)

const ratingRouter = require("./routes/rating.route")
app.use("/api/ratings", ratingRouter)

const paymentRouter = require("./routes/payment.route")
app.use("/api/payments",paymentRouter)

module.exports=app