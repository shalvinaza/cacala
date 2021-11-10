const { pool } = require("../dbConfig")

exports.selectAllCalon = async (req, res) => {
   try{
      const calon = await pool.query(
         "select c.id_calon, c.nama, c.foto, c.slogan, a.id_admin, j.jabatan_tujuan, k.kota, p.provinsi, pend.nama_institusi, pend.detail_pendidikan, pend.tahun_mulai_pendidikan, pend.tahun_selesai_pendidikan, pek.nama_pekerjaan, pek.detail_pekerjaan, pek.tahun_mulai_pekerjaan, pek.tahun_selesai_pekerjaan FROM calon c JOIN admins a on c.id_admin = a.id_admin JOIN jabatan j on c.id_jabatan = j.id_jabatan JOIN kota k on c.id_dapil_kota = k.id_kota JOIN provinsi p on k.id_provinsi = p.id_provinsi JOIN riwayat_pendidikan pend on pend.id_calon = c.id_calon JOIN riwayat_pekerjaan pek on pek.id_calon = c.id_calon;"
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

exports.selectCalonByUser = async (req, res) => {
   const {id} = req.params
   try{
      const calon = await pool.query(
         "select c.id_calon, c.nama, c.foto, c.slogan, a.id_admin, j.jabatan_tujuan, k.kota, p.provinsi, pend.nama_institusi, pend.detail_pendidikan, pend.tahun_mulai_pendidikan, pend.tahun_selesai_pendidikan, pek.nama_pekerjaan, pek.detail_pekerjaan, pek.tahun_mulai_pekerjaan, pek.tahun_selesai_pekerjaan FROM calon c JOIN admins a on c.id_admin = a.id_admin JOIN jabatan j on c.id_jabatan = j.id_jabatan JOIN kota k on c.id_dapil_kota = k.id_kota JOIN provinsi p on k.id_provinsi = p.id_provinsi JOIN riwayat_pendidikan pend on pend.id_calon = c.id_calon JOIN riwayat_pekerjaan pek on pek.id_calon = c.id_calon WHERE c.id_calon = $1;", [
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
         "SELECT calon.id_calon, calon.nama, calon.foto, calon.slogan, admins.id_admin, jabatan.jabatan_tujuan, kota.kota, provinsi.provinsi FROM calon JOIN admins on calon.id_admin = admins.id_admin JOIN jabatan on calon.id_jabatan = jabatan.id_jabatan JOIN kota on calon.id_dapil_kota = kota.id_kota JOIN provinsi on kota.id_provinsi = provinsi.id_provinsi WHERE kota.id_kota = $1;",[
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
         "SELECT calon.id_calon, calon.nama, calon.foto, calon.slogan, admins.id_admin, jabatan.jabatan_tujuan, kota.kota, provinsi.provinsi FROM calon JOIN admins on calon.id_admin = admins.id_admin JOIN jabatan on calon.id_jabatan = jabatan.id_jabatan JOIN kota on calon.id_dapil_kota = kota.id_kota JOIN provinsi on kota.id_provinsi = provinsi.id_provinsi WHERE calon.id_jabatan = $1;",[
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
         "SELECT calon.id_calon, calon.nama, calon.foto, calon.slogan, admins.id_admin, jabatan.jabatan_tujuan, kota.kota, provinsi.provinsi, partai.nama_partai FROM calon JOIN admins on calon.id_admin = admins.id_admin JOIN jabatan on calon.id_jabatan = jabatan.id_jabatan JOIN kota on calon.id_dapil_kota = kota.id_kota JOIN provinsi on kota.id_provinsi = provinsi.id_provinsi JOIN partai_calon ON partai_calon.id_calon = calon.id_calon JOIN partai ON partai_calon.id_partai = partai.id_partai WHERE partai_calon.id_partai = $1;",[
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

// exports.selectPartaiCalon = async (req, res) => {
//    const { id_calon } = req.params
//    try{
//       const calon = await pool.query(
//          "select calon.nama, partai.nama_partai FROM partai_calon JOIN calon ON partai_calon.id_calon = calon.id_calon JOIN partai ON partai_calon.id_partai = partai.id_partai WHERE partai_calon.id_calon = $1;", [
//             id_calon
//          ]
//       )

//       res.json(calon.rows)
//    } catch(err) {
//       res.json({ message: err })
//    }
// }

exports.selectPartaiCalon = async (req, res) => {
   const { id_calon } = req.params
   try{
      const calon = await pool.query(
         "select partai.nama_partai FROM partai_calon JOIN calon ON partai_calon.id_calon = calon.id_calon JOIN partai ON partai_calon.id_partai = partai.id_partai WHERE partai_calon.id_calon = $1;",[
            id_calon
         ])
      
         res.json(calon.rows)
   } catch(err) {
      res.json({ message: err })
   }
}

exports.addRiwayatPendidikanCalon = async (req, res) => {
   try{
      const { id_calon } = req.body
      const { nama_institusi } = req.body
      const { detail } = req.body
      const { tahun_mulai } = req.body
      const { tahun_selesai } = req.body

      const calon = await pool.query(
         "INSERT INTO riwayat_pendidikan(id_calon, nama_institusi, detail_pendidikan, tahun_mulai_pendidikan , tahun_selesai_pendidikan) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [id_calon, nama_institusi, detail, tahun_mulai, tahun_selesai])

      res.json(calon)
   } catch (err){
      console.error(err.message)
   }
}

exports.addRiwayatPekerjaanCalon = async (req, res) => {
   try{
      const { id_calon } = req.body
      const { nama_pekerjaan } = req.body
      const { detail } = req.body
      const { tahun_mulai } = req.body
      const { tahun_selesai } = req.body

      const calon = await pool.query(
         "INSERT INTO riwayat_pekerjaan(id_calon, nama_pekerjaan, detail_pekerjaan, tahun_mulai_pekerjaan, tahun_selesai_pekerjaan) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [id_calon, nama_pekerjaan, detail, tahun_mulai, tahun_selesai])

      res.json(calon)
   } catch (err){
      console.error(err.message)
   }
}

exports.selectCalonByAdmin = async (req, res) => {
   try{
      const calon = await pool.query(
         'select c.id_calon, c.nama, c.foto, c.slogan, a.id_admin, j.jabatan_tujuan, k.kota, p.provinsi, pend.nama_institusi, pend.detail_pendidikan, pend.tahun_mulai_pendidikan, pend.tahun_selesai_pendidikan, pek.nama_pekerjaan, pek.detail_pekerjaan, pek.tahun_mulai_pekerjaan, pek.tahun_selesai_pekerjaan FROM admins a JOIN calon c on c.id_admin = a.id_admin JOIN jabatan j on c.id_jabatan = j.id_jabatan JOIN kota k on c.id_dapil_kota = k.id_kota JOIN provinsi p on k.id_provinsi = p.id_provinsi JOIN riwayat_pendidikan pend on pend.id_calon = c.id_calon JOIN riwayat_pekerjaan pek on pek.id_calon = c.id_calon  WHERE a.id_admin = $1;', [
         req.user
      ])

      res.json(calon.rows[0])
   } catch(err) {
      res.json({ message: err })
   }
}