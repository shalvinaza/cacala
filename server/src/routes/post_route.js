const path = require('path')
const express = require("express")
const router = express.Router()
const controller = require("../controllers/post_controller")
const authorization = require("../middleware/authorization")
const multer = require("multer")
const app = express()

const storage = multer.diskStorage({
    // destination: function(req, file, cb){
    //    cb(null,path.join(__dirname,'/uploads/'));
    // },
    filename: function(req, file, cb){
       cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
 });

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
 
 const upload = multer({
    dest:'./uploads/',
    storage:storage,
    fileFilter,
    limits: {
       fileSize: MAX_SIZE
    }
 })
 
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
 

router.post("/", authorization, upload.array('foto'), async (req, res) => {
    try{
        // const fotos = []
        // const url = req.protocol + '://' + req.get('host')
  
        // for(let i = 0; i<req.foto.length; i++){
        //    fotos.push(url + './server/uploads/' + req.foto[i].filename)
        // }
  
        const { judul } = req.body
        const { teks } = req.body
        const { foto } = req.file
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