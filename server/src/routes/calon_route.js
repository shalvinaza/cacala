const express = require("express")
const router = express.Router()
const controller = require("../controllers/calon_controller")

router.get("/", controller.selectAllCalon)
router.get("/partai", controller.selectPartai)
router.post("/", controller.addCalon)
router.get("/:id", controller.selectSpecificCalon)
router.get("/kota/:id_kota", controller.selectCalonByKota)
router.get("/jabatan/:id_jabatan", controller.selectCalonByJabatan)
router.get("/partai/:id_partai", controller.selectCalonByPartai)

module.exports = router