const express = require("express")
const router = express.Router()
const controller = require("../controllers/calon_controller")
const authorization = require("../middleware/authorization")

router.get("/", controller.selectAllCalon)
router.get("/admin", authorization, controller.selectCalonByAdmin)
router.post("/", controller.addCalon)
router.get("/:id_admin", controller.selectCalonByUser)
router.get("/kota/:id_kota", controller.selectCalonByKota)
router.get("/jabatan/:id_jabatan", controller.selectCalonByJabatan)

router.get("/partai/:id_partai", controller.selectCalonByPartai)
router.get("/partai/:id_calon", controller.selectPartaiCalon)
//router.get("/partai", controller.selectPartai)

router.post("/riwayat-pendidikan", controller.addRiwayatPendidikanCalon)
router.post("/riwayat-pekerjaan", controller.addRiwayatPekerjaanCalon)

router.get("/dprdKota/:id_kota", controller.selectCalonDPRDKotaByKota)

module.exports = router