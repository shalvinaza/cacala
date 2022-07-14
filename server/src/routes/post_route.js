const express = require("express")
const { pool } = require("../dbConfig")
const multer = require('multer')
const path = require('path')
const app = express()
const router = express.Router()
const cloudinary = require('../utils/cloudinary')

const authorization = require("../middleware/authorization")
const controller = require("../controllers/post_controller")

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

 router.post("/", upload.single("image"), authorization, async (req, res, next) => {
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

router.get("/:id_post", async (req, res) => {
   const {id_post} = req.params
   try{
      let post = await pool.query(
         "select * from post where id_post = $1", [
         id_post
      ])

      res.json(post.rows)
   } catch(err) {
      res.json({ message: err })
   }
})

router.put("/:id_post", upload.single("image"), async (req, res) => {
   try{
      const { id_post } = req.params

      try{
         var post = await pool.query(
            "select * from post where id_post = $1;", [
            id_post
         ])
      } catch(err) {
         console.log(err)
      }

      let foto = post.foto
      let id_foto = post.id_foto

      if(!req.file){
         try{
            if(!post.id_foto){
               foto = null
               id_foto = null
            } else {
               foto = req.body.foto
               id_foto = req.body.id_foto
               // foto = req.body.foto
               // id_foto = req.body.id_foto
            }
         }catch(err){
            console.log(err)
         }
      }
      else{
         try{
            if(post.id_foto){
               await cloudinary.uploader.destroy(post.id_foto)
               var uploadedFoto = await cloudinary.uploader.upload(req.file.path)
            } else{
               var uploadedFoto = await cloudinary.uploader.upload(req.file.path)
            }
            foto = uploadedFoto.secure_url
            id_foto = uploadedFoto.public_id
            console.log(req.file)
         } catch(err){
            console.log(err)
         }
      }

      const { judul } = req.body
      const { teks } = req.body

      post = await pool.query(
         "UPDATE post SET judul = $1, teks = $2, foto = COALESCE (NULLIF($3, ''), foto), id_foto = COALESCE (NULLIF($4, ''), id_foto) WHERE id_post = $5", [
            judul, teks, foto, id_foto, id_post
         ]
      )

      res.json("Update berhasil")
   } catch (err) {
      res.json({ message: err })
   }
})

router.delete("/:id_post", async (req, res)=> {
   try{
      const { id_post } = req.params
      const { id_foto } = req.body

      if(id_foto){
         await cloudinary.uploader.destroy(id_foto)
      }

      // let post = await pool.query(
      //    "SELECT * FROM post WHERE id_post = $1", [
      //       id_post
      //    ]
      // )

      const post = await pool.query(
         "DELETE FROM post WHERE id_post = $1", [
            id_post
         ]
      )

      res.json("Post is deleted")
   } catch (err) {
      res.json({ message: err })
   }
})

router.get("/user/:id_admin", controller.selectPostByUser)

module.exports = router