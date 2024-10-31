const express = require("express")
const router = express.Router()

const productController = require("../controller/product.controller")
const authenticate = require("../middleware/authenticate")

router.get("/",productController.getAllProducts)
router.get("/saler",productController.getAllProductsSaler)
router.get("/id/:id",productController.findProductById)
router.get("/category",productController.getAllCategory)
router.get("/:categoryName",productController.getProductByCategory)

module.exports=router