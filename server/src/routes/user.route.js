const express = require("express")
const router = express.Router()
const userController = require("../controller/user.controller")
const authenticate = require("../middleware/authenticate")


router.get("/profile",authenticate, userController.getUserProfile)
router.get("/", userController.getAllUsers)
router.delete("/:id", userController.deleteUserById)
router.get("/:id", userController.findUserById)

module.exports=router