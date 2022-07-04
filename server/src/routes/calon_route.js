const express = require("express")
const router = express.Router()
const controller = require("../controllers/calon_controller")
const authorization = require("../middleware/authorization")

router.get("/admin", authorization, controller.selectCalonByAdmin)
router.get("/", controller.selectAllCalon)
router.get("/:id_admin", controller.selectCalonByUser)
router.get("/:id_calon", controller.selectCalonByIdCalon)
router.get("/dev/:id_calon", controller.selectCalonByIdCalonForDev)
router.get("/wakil", controller.selectAllWakil)
router.post("/wakil", controller.addWakil)
router.post("/", controller.addCalon)
router.put("/:id_calon", controller.updateCalon)
router.put("/wakil/:id_wakil", controller.updateWakil)
router.delete("/:id_calon", controller.deleteCalon)
router.delete("/wakil/:id_wakil", controller.deleteWakil)


router.get("/kota/:id_kota", controller.selectCalonByKota)
router.get("/jabatan/:id_jabatan", controller.selectCalonByJabatan)

// router.get("/:id_jabatan/:id_partai", controller.selectCalonByPartai)
//router.get("/partai", controller.selectPartai)

router.post("/riwayat-pendidikan", controller.addRiwayatPendidikanCalon)
router.post("/riwayat-pekerjaan", controller.addRiwayatPekerjaanCalon)
router.post("/wakil/riwayat-pendidikan", controller.addRiwayatPekerjaanWakil)
router.post("/wakil/riwayat-pekerjaan", controller.addRiwayatPendidikanWakil)


router.get("/dprdKota/:id_kota", controller.selectCalonDPRDKotaByKota)
router.get("/dprdProv/:id_provinsi", controller.selectCalonDPRDProvByProv)
router.get("/search/:str", controller.selectForSearch)
// router.get("/dprdProv/kota/:id_kota", controller.selectCalonDPRDProvByKota)
// router.get("/dprRI/provinsi/:id_provinsi", controller.selectCalonDPRRIByProv)
// router.get("/dpd/provinsi/:id_provinsi", controller.selectCalonDPDByProv)


router.get("/:id_jabatan/:id_partai", controller.selectCalonByPartai)

module.exports = router