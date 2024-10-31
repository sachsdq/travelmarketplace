const express = require("express")
const router = express.Router()

const addressController = require("../controller/address.controller")
const authenticate = require("../middleware/authenticate")

router.get("/",authenticate,addressController.getUserShipAddress)

module.exports = router
