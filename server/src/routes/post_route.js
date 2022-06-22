const express = require("express")
const { pool } = require("../dbConfig")
const multer = require('multer')
const path = require('path')
const app = express()
const router = express.Router()
const cloudinary = require('../utils/cloudinary')

const authorization = require("../middleware/authorization")
const controller = require("../controllers/post_controller")
const e = require("express")

// const storage = multer.diskStorage({
//    destination: function(req, file, cb){
//       cb(null, './uploads/')
//    },
//    filename: function(req, file, cb){
//       cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
//    }
// })




router.get("/", authorization,  controller.selectPostByAdmin)

const fileFilter = function(req, file, cb){
   allowedTypes = ["image/jpeg", "image/png", "image/gif"];

   if(!allowedTypes.includes(file.mimetype)){
      const error = new Error("Hanya dapat mengunggah foto");
      error.code = "LIMIT_FILE_TYPES";
      return cb(error, false);
   }
   cb(null, true);
}

const MAX_SIZE = 200000;

app.use(function(err, req, res, next){
   if(err.code === "LIMIT_FILE_TYPES"){
      res.status(422).json({error: "Hanya boleh memilih gambar"});
      return;
   }

   if(err.code === "LIMIT_FILE_SIZE"){
      res.status(422).json({error: `File terlalu besar. Besar file maksimal ${MAX_SIZE / 1000}Kb`});
      return;
   }
})

const upload = multer({
   storage:multer.diskStorage({}),
   fileFilter: fileFilter,
   limits: {
      fileSize: MAX_SIZE
   }
 })

 router.post("/", upload.single('foto'), authorization, async (req, res, next) => {
   try{
       // const fotos = []
       // const url = req.protocol + '://' + req.get('host')
 
       // for(let i = 0; i<req.foto.length; i++){
       //    fotos.push(url + './server/uploads/' + req.foto[i].filename)
       // }

       
      //  const foto = req.file.filename
      const { judul } = req.body
      const { teks } = req.body
      let foto = null
      let id_foto = null

      if(req.file){
         const uploadedFoto = await cloudinary.uploader.upload(req.file.path)
         foto = uploadedFoto.secure_url 
         id_foto = uploadedFoto.public_id 
         console.log(req.file)
      } 

       const post = await pool.query(
          "INSERT INTO post(id_admin, judul, teks, foto, id_foto) VALUES($1, $2, $3, $4, $5) RETURNING *",
          [req.user, judul, teks, foto, id_foto]
       )
 
       res.json(post)
    } catch(err) {
       console.error(err.message)
    }
})
router.get("/:id_post", controller.selectPostById)
router.put("/:id_post", upload.single('foto'), controller.updatePost)
router.delete("/:id_post", controller.deletePost)

router.get("/user/:id_admin", controller.selectPostByUser)

module.exports = router