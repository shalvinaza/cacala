const express = require("express")
const router = express.Router()
const controller = require("../controllers/admin_controller")
const authorization = require("../middleware/authorization")

router.get("/", authorization, controller.getAdmin)
router.get("/totalFollowers", authorization, controller.totalFollowers)
router.put("/:id", controller.updateAdmin)

module.exports = router