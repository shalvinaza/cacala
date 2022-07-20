const express = require("express")
const router = express.Router()
const controller = require("../controllers/calon_controller")
const authorization = require("../middleware/authorization")
const { pool } = require("../dbConfig")
const multer = require('multer')
const path = require('path')
const app = express()
const cloudinary = require('../utils/cloudinary')

router.get("/admin", authorization, controller.selectCalonByAdmin)
router.get("/", controller.selectAllCalon)
router.get("/:id_admin", controller.selectCalonByUser)
router.get("/presiden/:id_jabatan", controller.selectCalonPresiden)
router.get("/pres/:id_admin", controller.selectPresByUser)
router.get("/:id_calon", controller.selectCalonByIdCalon)
router.get("/dev/:id_calon", controller.selectCalonByIdCalonForDev)
router.get("/wakil", controller.selectAllWakil)
router.post("/wakil", controller.addWakil)

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

router.post("/", upload.single("imgCalon"), async (req, res, next) => {
    try{
        const { id_admin } = req.body
        const { id_jabatan } = req.body
        const { nama } = req.body
        // const { foto } = req.body
        // const { slogan } = req.body
        const { no_urut } = req.body
        let foto = null
        let id_foto = null

        if(req.file){
            const fotoCalon = await cloudinary.uploader.upload(req.file.path)
            foto = fotoCalon.secure_url
            id_foto = fotoCalon.public_id
            console.log(req.file)
         }
   
         const calon = await pool.query(
            "INSERT INTO Calon(id_admin, id_jabatan, nama, foto, id_foto, no_urut) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
         [id_admin, id_jabatan, nama, foto, id_foto, no_urut])
   
         res.json(calon.rows)
    }catch(err){
        console.log(err)
    }
})

router.put("/:id_calon", upload.single("imgCalon"), async (req, res, next) => {
    try{
        const { id_calon } = req.params

        try{
            var calon = await pool.query(
            "select * from calon where id_calon = $1;",[
                id_calon
            ])
        } catch(err){
            console.log(err)
        }

        let foto = calon.foto
        let id_foto = calon.id_foto

        if(!req.file){
            try{
                if(!calon.foto){
                    foto = null
                    id_foto = null
                } else {
                    foto = req.body.foto
                    id_foto = req.body.id_foto
                }
            } catch (err){
                console.log(err)
            }
        } 
        else {
            try{
                if(calon.foto && calon.id_foto){
                    await cloudinary.uploader.destroy(calon.id_foto)
                    var fotoCalon = await cloudinary.uploader.upload(req.file.path)
                }
                else{
                    var fotoCalon = await cloudinary.uploader.upload(req.file.path)
                }
                foto = fotoCalon.secure_url
                id_foto = fotoCalon.public_id
                console.log(req.file)
            }catch(err){
                console.log(err)
            }
        }

        const { id_admin } = req.body
        const { id_jabatan } = req.body
        const { nama } = req.body
        // const { foto } = req.body
        const { slogan } = req.body
        const { no_urut } = req.body

        calon = await pool.query(
           "UPDATE calon SET id_admin = COALESCE (NULLIF($1, ''), id_admin), id_jabatan = COALESCE (NULLIF($2, ''), id_jabatan), nama = COALESCE (NULLIF($3, ''), nama), foto = COALESCE (NULLIF($4, ''), foto), id_foto = COALESCE (NULLIF($5, ''), id_foto), slogan = COALESCE (NULLIF($6, ''), slogan), no_urut = COALESCE (NULLIF($7, ''), no_urut) WHERE id_calon = $8 RETURNING *;",
           [id_admin, id_jabatan, nama, foto, id_foto, slogan, no_urut, id_calon]
        )
  
        res.json(calon.rows)
     } catch(err){
        console.error(err.message)
     } 
})



router.put("/wakil/:id_wakil", controller.updateWakil)
router.delete("/:id_calon", async (req, res) => {
    try{
        const { id_calon } = req.params
        const { id_foto } = req.body

        if(id_foto){
            await cloudinary.uploader.destroy(id_foto)
         }
  
        const calon = await pool.query(
           "DELETE FROM calon WHERE id_calon = $1", [
             id_calon
           ]
        )
  
        res.json("Calon berhasil dihapus")
     } catch (err) {
        res.json({ message: err })
        console.log(err)
     }
})
router.delete("/wakil/:id_wakil", controller.deleteWakil)


router.get("/kota/:id_kota", controller.selectCalonByKota)
router.get("/jabatan/:id_jabatan", controller.selectCalonByJabatan)
router.get("/prov/:id_jabatan", controller.selectDprdProvAdmin)
router.get("/kab/:id_jabatan", controller.selectCalonDPRDKotaAdmin)
router.get("/pos/:id_calon", controller.selectPostersById)
router.delete("/pos/:id_posters", controller.deletePosters)

// router.get("/:id_jabatan/:id_partai", controller.selectCalonByPartai)
//router.get("/partai", controller.selectPartai)

router.post("/riwayat-pendidikan", controller.addRiwayatPendidikanCalon)
router.put("/update-pen/:id_pendidikan", controller.updateRiwayatPendidikan)
router.delete("/pen/:id_pendidikan", controller.deleteRiwayatPendidikan)
router.post("/riwayat-pekerjaan", controller.addRiwayatPekerjaanCalon)
router.put("/update-pek/:id_pekerjaan", controller.updateRiwayatPekerjaan)
router.delete("/pek/:id_pekerjaan", controller.deleteRiwayatPekerjaan)
router.post("/wakil/riwayat-pendidikan", controller.addRiwayatPekerjaanWakil)
router.post("/wakil/riwayat-pekerjaan", controller.addRiwayatPendidikanWakil)


router.get("/dprdKota/:id_kota", controller.selectCalonDPRDKotaByKota)
router.get("/dprdProv/:id_provinsi", controller.selectCalonDPRDProvByProv)
router.get("/search/:str", controller.selectForSearch)
// router.get("/dprdProv/kota/:id_kota", controller.selectCalonDPRDProvByKota)
// router.get("/dprRI/provinsi/:id_provinsi", controller.selectCalonDPRRIByProv)
// router.get("/dpd/provinsi/:id_provinsi", controller.selectCalonDPDByProv)


router.get("/:id_jabatan/:id_partai", controller.selectCalonByPartai)


router.post("/posters", upload.single("imgPoster"), async(req,res, next) => {
    try{
        const { id_calon } = req.body
        const { slogan } = req.body
        let poster = null
        let id_poster = null

        if(req.file){
            const uploadedPoster = await cloudinary.uploader.upload(req.file.path)
            poster = uploadedPoster.secure_url
            id_poster = uploadedPoster.public_id
            console.log(req.file)
         }

        const posters = await pool.query(
            "INSERT INTO posters(id_calon, poster, id_poster, slogan_calon) VALUES ($1, $2, $3, $4) RETURNING *",
        [id_calon, poster, id_poster, slogan])
    
        res.json(posters)
    } catch (err){
        console.error(err)
    }
})

router.put("/pos/:id_posters", upload.single("imgPoster"), async (req, res, next) => {
    try{
        const { id_posters } = req.params

        try{
            var posters = await pool.query(
            "select * from posters where id_posters = $1;",[
                id_posters
            ])
        } catch(err){
            console.log(err)
        }

        let poster = posters.poster
        let id_poster = posters.id_poster

        if(!req.file){
            try{
                if(!posters.foto){
                    poster = null
                    id_poster = null
                } else {
                    poster = req.body.poster
                    id_poster = req.body.id_poster
                }
            } catch (err){
                console.log(err)
            }
        } 
        else {
            try{
                if(posters.foto){
                    await cloudinary.uploader.destroy(posters.id_poster)
                    var posterCalon = await cloudinary.uploader.upload(req.file.path)
                }
                else{
                    var posterCalon = await cloudinary.uploader.upload(req.file.path)
                }
                poster = posterCalon.secure_url
                id_poster = posterCalon.public_id
                console.log(req.file)
            }catch(err){
                console.log(err)
            }
        }

        const { slogan } = req.body

        posters = await pool.query(
           "UPDATE posters SET poster = COALESCE (NULLIF($1, ''), poster), id_poster = COALESCE (NULLIF($2, ''), id_poster), slogan_calon = COALESCE (NULLIF($3, ''), slogan_calon) WHERE id_posters = $4 RETURNING *;",
           [poster, id_poster, slogan, id_posters]
        )
  
        res.json(posters.rows)
     } catch(err){
        console.error(err.message)
     } 
})




module.exports = router