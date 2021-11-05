const express = require("express")
const router = express.Router()
const controller = require("../controllers/user_controller")
const authorization = require("../middleware/authorization")

router.get("/", authorization, controller.getUser)
router.put("/:id", controller.updateUser)
router.get("/followed", authorization, controller.selectFollowedCalonByUser)

module.exports = router
