const express = require("express")
const router = express.Router()
const controller = require("../controllers/partai_controller")
const { pool } = require("../dbConfig")
const multer = require('multer')
const path = require('path')
const app = express()
const cloudinary = require('../utils/cloudinary')

router.get("/", controller.selectAllPartai)

// multer for calon pic

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


router.post("/", upload.single('imgPartai'), async (req, res) => {
    try{
        const { nama_partai } = req.body
        // const { logo_partai } = req.body
        let logo_partai = null
        let id_logo = null

        if(req.file){
            const logoCalon = await cloudinary.uploader.upload(req.file.path)
            logo_partai = logoCalon.secure_url
            id_logo = logoCalon.public_id
            console.log(req.file)
         }
  
        const partai = await pool.query(
           "INSERT INTO partai(nama_partai, logo_partai, id_logo) VALUES($1, $2, $3) RETURNING *",
           [nama_partai, logo_partai, id_logo]
        )
  
        res.json(partai.rows)
     } catch(err) {
        console.error(err.message)
     }
})

router.put("/:id_partai", upload.single('imgPartai'), async (req, res) => {
    try{
        const { id_partai } = req.params

        try{
            var partai = await pool.query(
            "select * from partai where id_partai = $1;",[
                id_partai
            ])
        } catch(err){
            console.log(err)
        }

        let logo_partai = partai.logo_partai
        let id_logo = partai.id_logo

        if(!req.file){
            try{
                if(!partai.logo_partai){
                    logo_partai = null
                    id_logo = null
                } else {
                    logo_partai = req.body.logo_partai
                    id_logo = req.body.id_logo
                }
            } catch (err){
                console.log(err)
            }
        } 
        else {
            try{
                if(partai.logo_partai && partai.id_logo){
                    await cloudinary.uploader.destroy(partai.id_logo)
                    var fotoPartai = await cloudinary.uploader.upload(req.file.path)
                }
                else{
                    var fotoPartai = await cloudinary.uploader.upload(req.file.path)
                }
                logo_partai = fotoPartai.secure_url
                id_logo = fotoPartai.public_id
                console.log(req.file)
            }catch(err){
                console.log(err)
            }
        }

        const { nama_partai } = req.body
 
        partai = await pool.query(
            "UPDATE partai SET nama_partai = COALESCE (NULLIF($1, ''), nama_partai), logo_partai = COALESCE (NULLIF($2, ''), logo_partai), id_logo = COALESCE (NULLIF($3, ''), id_logo) WHERE id_partai = $4 RETURNING *;",
            [nama_partai, logo_partai, id_logo, id_partai]
        )
    
        res.json(partai.rows)
    } catch(err) {
       console.error(err.message)
    }
})

router.delete("/:id_partai", controller.deletePartai)


router.get("/calon/:id_calon", controller.selectPartaiCalon)
router.post("/calon", controller.addPartaiToCalon)

module.exports = router