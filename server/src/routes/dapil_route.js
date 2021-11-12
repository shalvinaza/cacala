const express = require("express")
const router = express.Router()
const controller = require("../controllers/dapil_controller")

router.get("/provinsi", controller.selectAllProvinsi)
router.post("/provinsi", controller.addProvinsi)
router.put("/provinsi/:id_provinsi", controller.updateProvinsi)
router.delete("/provinsi/:id_provinsi", controller.deleteProvinsi)

router.get("/kota", controller.selectAllKota)
router.post("/kota/", controller.addKota)
router.put("/kota/:id_kota", controller.updateKota)
router.delete("/kota/:id_kota", controller.deleteKota)

module.exports = router