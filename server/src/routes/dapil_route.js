const express = require("express")
const router = express.Router()
const controller = require("../controllers/dapil_controller")

router.get("/provinsi", controller.selectAllProvinsi)
router.post("/provinsi", controller.addProvinsi)
router.put("/provinsi/:id_provinsi", controller.updateProvinsi)
router.delete("/provinsi/:id_provinsi", controller.deleteProvinsi)
router.get("/provinsi/:id_provinsi", controller.selectProvinsiById)

router.get("/kota", controller.selectAllKota)
router.post("/kota/", controller.addKota)
router.put("/kota/:id_kota", controller.updateKota)
router.delete("/kota/:id_kota", controller.deleteKota)
router.get("/kota/:id_kota", controller.selectKotaById)
router.get("/kota/provinsi/:id_provinsi", controller.selectKotaByIdProvinsi)

router.get("/kecamatan", controller.selectAllKecamatan)
router.post("/kecamatan/", controller.addKecamatan)
router.put("/kecamatan/:id_kecamatan", controller.updateKecamatan)
router.delete("/kecamatan/:id_kecamatan", controller.deleteKecamatan)
router.get("/kecamatan/:id_kecamatan", controller.selectKecamatanById)
router.get("/kecamatan/kota/:id_kota", controller.selectKecamatanByIdKota)
router.get("/kota/:id_calon", controller.selectKotaCalon)
router.get("/kecamatan/:id_calon", controller.selectKecamatanCalon)
router.post("/addKota", controller.addKotaToDapil)
router.post("/addKecamatan", controller.addKecamatanToDapil)

module.exports = router