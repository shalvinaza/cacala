const express = require("express")
const router = express.Router()
const controller = require("../controllers/user_controller")
const validInfo = require("../middleware/validInfo")
const authorization = require("../middleware/authorization")

router.get("/", controller.selectAllUsers)
router.post("/register", validInfo, controller.register)
router.post("/login", validInfo, controller.login)

module.exports = router