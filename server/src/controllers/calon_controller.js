const { pool } = require("../dbConfig")

exports.selectAllCalon = async (req, res) => {
   try{
      const calon = await pool.query(
         "select calon.id_calon, calon.nama, calon.foto, calon.slogan, admins.username, jabatan.jabatan_tujuan, kota.kota, provinsi.provinsi FROM calon JOIN admins on calon.id_admin = admins.id_admin JOIN jabatan on calon.id_jabatan = jabatan.id_jabatan JOIN kota on calon.id_dapil_kota = kota.id_kota JOIN provinsi on kota.id_provinsi = provinsi.id_provinsi;"
      )

      res.json(calon.rows)
   } catch(err) {
      res.json({ message: err })
   }
}

exports.addCalon = async (req, res) => {
   try{
      const { id_admin } = req.body
      const { id_jabatan } = req.body
      const { id_dapil_kota } = req.body
      const { nama } = req.body
      const { foto } = req.body
      const { slogan } = req.body

      const calon = await pool.query(
         "INSERT INTO Calon(id_admin, id_jabatan, id_dapil_kota, nama, foto, slogan) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [id_admin, id_jabatan, id_dapil_kota, nama, foto, slogan])

      res.json(calon)
   } catch (err){
      console.error(err.message)
   }
}

exports.selectSpecificCalon = async (req, res) => {
   const {id} = req.params
   try{
      const calon = await pool.query(
         "SELECT calon.id_calon, calon.nama, calon.foto, calon.slogan, admins.username, jabatan.jabatan_tujuan, kota.kota, provinsi.provinsi FROM calon JOIN admins on calon.id_admin = admins.id_admin JOIN jabatan on calon.id_jabatan = jabatan.id_jabatan JOIN kota on calon.id_dapil_kota = kota.id_kota JOIN provinsi on kota.id_provinsi = provinsi.id_provinsi WHERE id_calon = $1;", [
         id
      ])

      res.json(calon.rows[0])
   } catch(err) {
      res.json({ message: err })
   }
}

exports.selectCalonByKota = async (req, res) => {
   const { id_kota } = req.params
   try{
      const calon = await pool.query(
         "SELECT calon.id_calon, calon.nama, calon.foto, calon.slogan, admins.username, jabatan.jabatan_tujuan, kota.kota, provinsi.provinsi FROM calon JOIN admins on calon.id_admin = admins.id_admin JOIN jabatan on calon.id_jabatan = jabatan.id_jabatan JOIN kota on calon.id_dapil_kota = kota.id_kota JOIN provinsi on kota.id_provinsi = provinsi.id_provinsi WHERE id_kota = $1;",[
            id_kota
         ])
      
         res.json(calon.rows)
   } catch(err) {
      res.json({ message: err })
   }
}

exports.selectCalonByJabatan = async (req, res) => {
   const { id_jabatan } = req.params
   try{
      const calon = await pool.query(
         "SELECT calon.id_calon, calon.nama, calon.foto, calon.slogan, admins.username, jabatan.jabatan_tujuan, kota.kota, provinsi.provinsi FROM calon JOIN admins on calon.id_admin = admins.id_admin JOIN jabatan on calon.id_jabatan = jabatan.id_jabatan JOIN kota on calon.id_dapil_kota = kota.id_kota JOIN provinsi on kota.id_provinsi = provinsi.id_provinsi WHERE calon.id_jabatan = $1;",[
            id_jabatan
         ])
      
         res.json(calon.rows)
   } catch(err) {
      res.json({ message: err })
   }
}

exports.selectCalonByPartai = async (req, res) => {
   const { id_partai } = req.params
   try{
      const calon = await pool.query(
         "SELECT calon.id_calon, calon.nama, calon.foto, calon.slogan, admins.username, jabatan.jabatan_tujuan, kota.kota, provinsi.provinsi, partai.nama_partai FROM calon JOIN admins on calon.id_admin = admins.id_admin JOIN jabatan on calon.id_jabatan = jabatan.id_jabatan JOIN kota on calon.id_dapil_kota = kota.id_kota JOIN provinsi on kota.id_provinsi = provinsi.id_provinsi JOIN partai_calon ON partai_calon.id_calon = calon.id_calon JOIN partai ON partai_calon.id_partai = partai.id_partai WHERE partai_calon.id_partai = $1;",[
            id_partai
         ])
      
         res.json(calon.rows)
   } catch(err) {
      res.json({ message: err })
   }
}

exports.selectPartai = async (req, res) => {
   try{
      const calon = await pool.query(
         "select calon.nama, partai.nama_partai FROM partai_calon JOIN calon ON partai_calon.id_calon = calon.id_calon JOIN partai ON partai_calon.id_partai = partai.id_partai;"
      )

      res.json(calon.rows)
   } catch(err) {
      res.json({ message: err })
   }
}