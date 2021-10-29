const express = require("express")
const router = express.Router()
const controller = require("../controllers/post_controller")

router.post("/", controller.addPostByAdmin)
router.get("/:id_admin", controller.selectPostByAdmin)
router.put("/:id_post", controller.updatePost)
router.delete("/:id_post", controller.deletePost)

module.exports = router