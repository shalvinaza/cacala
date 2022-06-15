const express = require("express")
const { pool } = require("../dbConfig")
const multer = require('multer')
const path = require('path')
const app = express()
const router = express.Router()

const controller = require("../controllers/post_controller")
const authorization = require("../middleware/authorization")

 const upload = multer({
   dest: './uploads/'
 });

router.post("/", upload.single('foto'), authorization, async (req, res, next) => {
    try{
        // const fotos = []
        // const url = req.protocol + '://' + req.get('host')
  
        // for(let i = 0; i<req.foto.length; i++){
        //    fotos.push(url + './server/uploads/' + req.foto[i].filename)
        // }
        console.log(req.file)
        const { judul } = req.body
        const { teks } = req.body
        const { foto } = req.body
        const { video } = req.body
  
        const post = await pool.query(
           "INSERT INTO post(id_admin, judul, teks, foto, video) VALUES($1, $2, $3, $4, $5) RETURNING *",
           [req.user, judul, teks, foto, video]
        )
  
        res.json(post)
     } catch(err) {
        console.error(err.message)
     }
})
router.get("/", authorization,  controller.selectPostByAdmin)
router.get("/:id_post", controller.selectPostById)
router.put("/:id_post", controller.updatePost)
router.delete("/:id_post", controller.deletePost)
router.post("/images", controller.addImage)

router.get("/user/:id_admin", controller.selectPostByUser)

module.exports = router