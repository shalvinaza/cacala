const { pool } = require("../dbConfig")

exports.selectAllCalon = async (req, res) => {
   try{
      const calon = await pool.query(
         "select c.id_calon, c.nama, c.foto, c.slogan, c.no_urut, a.id_admin, a.username, j.jabatan_tujuan FROM calon c JOIN admins a on c.id_admin = a.id_admin JOIN jabatan j on c.id_jabatan = j.id_jabatan"
      )

      const length = Object.keys(calon.rows).length
      
      for(let i=0; i<length; i++){
         id_calon = calon.rows[i].id_calon

         partai = await pool.query(
            "select partai.* FROM partai_calon JOIN calon ON partai_calon.id_calon = calon.id_calon JOIN partai ON partai_calon.id_partai = partai.id_partai WHERE partai_calon.id_calon = $1;",
             [calon.rows[i].id_calon]
         )

         kota = await pool.query(
            "select kota.*, provinsi.provinsi FROM dapil_calon dapil JOIN calon ON dapil.id_calon = calon.id_calon JOIN kota ON dapil.id_kota = kota.id_kota JOIN provinsi ON kota.id_provinsi = provinsi.id_provinsi WHERE dapil.id_calon = $1;",
             [calon.rows[i].id_calon]
         )

         kecamatan = await pool.query(
            "select kecamatan.* FROM dapil_calon dapil JOIN calon ON dapil.id_calon = calon.id_calon JOIN kecamatan ON dapil.id_kecamatan = kecamatan.id_kecamatan WHERE dapil.id_calon = $1;",
             [calon.rows[i].id_calon]
         )

         pendidikan = await pool.query(
            "select pen.* FROM riwayat_pendidikan pen JOIN calon c ON pen.id_calon = c.id_calon WHERE pen.id_calon = $1",
            [id_calon]
         )

         pekerjaan = await pool.query(
            "select pek.* FROM riwayat_pekerjaan pek JOIN calon c ON pek.id_calon = c.id_calon WHERE pek.id_calon = $1",
            [id_calon]
         )

         j = 0
         calon.rows[i] = {...calon.rows[i], partai: partai.rows, kota: kota.rows, kecamatan: kecamatan.rows, riwayat_pendidikan: pendidikan.rows, riwayat_pekerjaan: pekerjaan.rows}
         calon.rows[i] = {...calon.rows[i], status: false}
      }

      res.json(calon.rows)
   } catch(err) {
      console.error(err.message)
   }
}

// exports.addCalon = async (req, res) => {
//    try{
//       const { id_admin } = req.body
//       const { id_jabatan } = req.body
//       const { nama } = req.body
//       // const { foto } = req.body
//       const { slogan } = req.body
//       const { no_urut } = req.body
//       let foto = null
//       let id_foto = null

//       if(req.file){
//          const fotoCalon = await cloudinary.uploader.upload(req.file.path)
//          foto = fotoCalon.secure_url
//          id_foto = fotoCalon.public_id
//          console.log(req.file)
//       }

//       const calon = await pool.query(
//          "INSERT INTO Calon(id_admin, id_jabatan, nama, foto, slogan, no_urut) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
//       [id_admin, id_jabatan, nama, foto, slogan, no_urut])

//       res.json(calon)
//    } catch (err){
//       console.error(err.message)
//    }
// }

// exports.updateCalon = async (req, res) => {
//    try{
//       const { id_calon } = req.params
//       const { id_admin } = req.body
//       const { id_jabatan } = req.body
//       const { nama } = req.body
//       const { foto } = req.body
//       const { slogan } = req.body
//       const { no_urut } = req.body

//       const update_calon = await pool.query(
//          "UPDATE calon SET id_admin = $1, id_jabatan = $2, nama = $3, foto = $4, slogan = $5, no_urut = $6 WHERE id_calon = $7",
//          [id_admin, id_jabatan, nama, foto, slogan, no_urut, id_calon]
//       )

//       res.json(update_calon)
//    } catch(err){
//       console.error(err.message)
//    }
// }

exports.deleteCalon = async (req, res) => {
   try{
      const { id_calon } = req.params

      const calon = await pool.query(
         "DELETE FROM calon WHERE id_calon = $1",
         [id_calon]
      )

      res.json("Calon is deleted")
   } catch(err){
      res.json({ message: err })
   }
}

exports.selectCalonByIdCalon = async (req, res) => {
   const {id_calon} = req.params
   try{
      let calon = await pool.query(
         "select c.id_calon, c.nama, c.foto, c.slogan, c.no_urut, a.id_admin, j.jabatan_tujuan, pend.nama_institusi, pend.detail_pendidikan, pend.tahun_mulai_pendidikan, pend.tahun_selesai_pendidikan, pek.nama_pekerjaan, pek.detail_pekerjaan, pek.tahun_mulai_pekerjaan, pek.tahun_selesai_pekerjaan FROM calon c JOIN admins a on c.id_admin = a.id_admin JOIN jabatan j on c.id_jabatan = j.id_jabatan JOIN riwayat_pendidikan pend on pend.id_calon = c.id_calon JOIN riwayat_pekerjaan pek on pek.id_calon = c.id_calon WHERE c.id_calon = $1;", [
            id_calon
      ])

      const length = Object.keys(calon).length
      
      for(let i=0; i<length; i++){
         partai = await pool.query(
            "select partai.nama_partai, partai.logo_partai FROM partai_calon JOIN calon ON partai_calon.id_calon = calon.id_calon JOIN partai ON partai_calon.id_partai = partai.id_partai WHERE partai_calon.id_calon = $1;",
             [calon.rows[0].id_calon]
         )

         kota = await pool.query(
            "select kota.*, provinsi.provinsi FROM dapil_calon dapil JOIN calon ON dapil.id_calon = calon.id_calon JOIN kota ON dapil.id_kota = kota.id_kota JOIN provinsi ON kota.id_provinsi = provinsi.id_provinsi WHERE dapil.id_calon = $1;",
             [calon.rows[i].id_calon]
         )

         kecamatan = await pool.query(
            "select kecamatan.* FROM dapil_calon dapil JOIN calon ON dapil.id_calon = calon.id_calon JOIN kecamatan ON dapil.id_kecamatan = kecamatan.id_kecamatan WHERE dapil.id_calon = $1;",
             [calon.rows[i].id_calon]
         )

         calon.rows[i] = {...calon.rows[i], partai: partai.rows, kota: kota.rows, kecamatan:kecamatan.rows}
      }

      res.json(calon.rows[0])
   } catch(err) {
      console.error(err.message)
   }
}

exports.selectCalonByIdCalonForDev = async (req, res) => {
   const {id_calon} = req.params
   try{
      const calon = await pool.query(
         "select * from calon WHERE id_calon = $1;", [
            id_calon
      ])

      res.json(calon.rows[0])
   } catch(err) {
      res.json({ message: err })
   }
}

exports.selectCalonByUser = async (req, res) => {
   const {id_admin} = req.params
   try{
      const calon = await pool.query(
         "select c.id_calon, c.nama, c.foto, c.slogan, c.no_urut, a.id_admin, j.jabatan_tujuan FROM calon c JOIN admins a ON c.id_admin = a.id_admin JOIN jabatan j ON c.id_jabatan = j.id_jabatan WHERE c.id_admin = $1", [
         id_admin
      ])

      const length = Object.keys(calon.rows).length
      
      for(let i=0; i<length; i++){
         // id_calon = calon.rows[i].id_calon

         partai = await pool.query(
            "select partai.nama_partai, partai.logo_partai FROM partai_calon JOIN calon ON partai_calon.id_calon = calon.id_calon JOIN partai ON partai_calon.id_partai = partai.id_partai WHERE partai_calon.id_calon = $1;",
             [calon.rows[i].id_calon]
         )

         kota = await pool.query(
            "select kota.*, provinsi.provinsi FROM dapil_calon dapil JOIN calon ON dapil.id_calon = calon.id_calon JOIN kota ON dapil.id_kota = kota.id_kota JOIN provinsi ON kota.id_provinsi = provinsi.id_provinsi WHERE dapil.id_calon = $1;",
             [calon.rows[i].id_calon]
         )

         kecamatan = await pool.query(
            "select kecamatan.* FROM dapil_calon dapil JOIN calon ON dapil.id_calon = calon.id_calon JOIN kecamatan ON dapil.id_kecamatan = kecamatan.id_kecamatan WHERE dapil.id_calon = $1;",
             [calon.rows[i].id_calon]
         )

         pendidikan = await pool.query(
            "select pen.* FROM riwayat_pendidikan pen JOIN calon c ON pen.id_calon = c.id_calon WHERE pen.id_calon = $1",
            [calon.rows[i].id_calon]
         )

         pekerjaan = await pool.query(
            "select pek.* FROM riwayat_pekerjaan pek JOIN calon c ON pek.id_calon = c.id_calon WHERE pek.id_calon = $1",
            [calon.rows[i].id_calon]
         )

         j = 0
         calon.rows[i] = {...calon.rows[i], partai: partai.rows, kota: kota.rows, kecamatan:kecamatan.rows, riwayat_pendidikan: pendidikan.rows, riwayat_pekerjaan: pekerjaan.rows}
         calon.rows[i] = {...calon.rows[i], status: false}
      }

      res.json(calon.rows)
   } catch(err) {
      res.json({ message: err })
   }
}

exports.selectCalonByKota = async (req, res) => {
   const { id_kota } = req.params
   try{
      const calon = await pool.query(
         "SELECT calon.id_calon, calon.nama, calon.foto, calon.slogan, calon.no_urut, admins.id_admin, jabatan.jabatan_tujuan, kota.kota FROM calon JOIN admins on calon.id_admin = admins.id_admin JOIN jabatan on calon.id_jabatan = jabatan.id_jabatan JOIN dapil_calon ON dapil_calon.id_calon = calon.id_calon JOIN kota ON dapil_calon.id_kota = kota.id_kota WHERE kota.id_kota = $1;",[
            id_kota
         ])

         const length = Object.keys(calon.rows).length
         
         for(let i=0; i<length; i++){
            id_calon = calon.rows[i].id_calon
   
            partai = await pool.query(
               "select partai.nama_partai, partai.logo_partai FROM partai_calon JOIN calon ON partai_calon.id_calon = calon.id_calon JOIN partai ON partai_calon.id_partai = partai.id_partai WHERE partai_calon.id_calon = $1;",
                [calon.rows[i].id_calon]
            )

            kota = await pool.query(
               "select kota.*, provinsi.provinsi FROM dapil_calon dapil JOIN calon ON dapil.id_calon = calon.id_calon JOIN kota ON dapil.id_kota = kota.id_kota JOIN provinsi ON kota.id_provinsi = provinsi.id_provinsi WHERE dapil.id_calon = $1;",
                [calon.rows[i].id_calon]
            )
   
            kecamatan = await pool.query(
               "select kecamatan.* FROM dapil_calon dapil JOIN calon ON dapil.id_calon = calon.id_calon JOIN kecamatan ON dapil.id_kecamatan = kecamatan.id_kecamatan WHERE dapil.id_calon = $1;",
                [calon.rows[i].id_calon]
            )
   
            j = 0
            calon.rows[i] = {...calon.rows[i], partai: partai.rows, kota: kota.rows, kecamatan:kecamatan.rows}
            calon.rows[i] = {...calon.rows[i], status: false}
         }
      
         res.json(calon.rows)
   } catch(err) {
      res.json({ message: err })
   }
}

exports.selectCalonByJabatan = async (req, res) => {
   const { id_jabatan } = req.params
   try{
      const calon = await pool.query(
         "SELECT calon.id_calon, calon.nama, calon.foto, calon.slogan, calon.no_urut, admins.id_admin, jabatan.jabatan_tujuan FROM calon JOIN admins on calon.id_admin = admins.id_admin JOIN jabatan on calon.id_jabatan = jabatan.id_jabatan WHERE calon.id_jabatan = $1 ORDER BY no_urut;",[
            id_jabatan
         ])

         const length = Object.keys(calon.rows).length
         
         for(let i=0; i<length; i++){
            id_calon = calon.rows[i].id_calon
   
            partai = await pool.query(
               "select partai.nama_partai, partai.logo_partai FROM partai_calon JOIN calon ON partai_calon.id_calon = calon.id_calon JOIN partai ON partai_calon.id_partai = partai.id_partai WHERE partai_calon.id_calon = $1;",
                [calon.rows[i].id_calon]
            )

            kota = await pool.query(
               "select kota.*, provinsi.provinsi FROM dapil_calon dapil JOIN calon ON dapil.id_calon = calon.id_calon JOIN kota ON dapil.id_kota = kota.id_kota JOIN provinsi ON kota.id_provinsi = provinsi.id_provinsi WHERE dapil.id_calon = $1;",
                [calon.rows[i].id_calon]
            )
   
            kecamatan = await pool.query(
               "select kecamatan.* FROM dapil_calon dapil JOIN calon ON dapil.id_calon = calon.id_calon JOIN kecamatan ON dapil.id_kecamatan = kecamatan.id_kecamatan WHERE dapil.id_calon = $1;",
                [calon.rows[i].id_calon]
            )
   
            j = 0
            calon.rows[i] = {...calon.rows[i], partai: partai.rows, kota: kota.rows, kecamatan:kecamatan.rows}
            calon.rows[i] = {...calon.rows[i], status: false}
         }
      
         res.json(calon.rows)
   } catch(err) {
      res.json({ message: err })
   }
}

exports.selectCalonByPartai = async (req, res) => {
   const { id_jabatan } = req.params
   const { id_partai } = req.params
   try{
      const calon = await pool.query(
         "SELECT calon.id_calon, calon.nama, calon.foto, calon.slogan, calon.no_urut, admins.id_admin, jabatan.jabatan_tujuan, partai.nama_partai FROM calon JOIN admins on calon.id_admin = admins.id_admin JOIN jabatan on calon.id_jabatan = jabatan.id_jabatan JOIN partai_calon ON partai_calon.id_calon = calon.id_calon JOIN partai ON partai_calon.id_partai = partai.id_partai WHERE jabatan.id_jabatan = $1 AND partai_calon.id_partai = $2;",[
            id_jabatan, id_partai
         ])

         const length = Object.keys(calon.rows).length
         
         for(let i=0; i<length; i++){
            id_calon = calon.rows[i].id_calon
   
            partai = await pool.query(
               "select partai.nama_partai, partai.logo_partai FROM partai_calon JOIN calon ON partai_calon.id_calon = calon.id_calon JOIN partai ON partai_calon.id_partai = partai.id_partai WHERE partai_calon.id_calon = $1;",
                [calon.rows[i].id_calon]
            )

            kota = await pool.query(
               "select kota.*, provinsi.provinsi FROM dapil_calon dapil JOIN calon ON dapil.id_calon = calon.id_calon JOIN kota ON dapil.id_kota = kota.id_kota JOIN provinsi ON kota.id_provinsi = provinsi.id_provinsi WHERE dapil.id_calon = $1;",
                [calon.rows[i].id_calon]
            )
   
            kecamatan = await pool.query(
               "select kecamatan.* FROM dapil_calon dapil JOIN calon ON dapil.id_calon = calon.id_calon JOIN kecamatan ON dapil.id_kecamatan = kecamatan.id_kecamatan WHERE dapil.id_calon = $1;",
                [calon.rows[i].id_calon]
            )
   
            j = 0
            calon.rows[i] = {...calon.rows[i], partai: partai.rows, kota: kota.rows, kecamatan:kecamatan.rows}
            calon.rows[i] = {...calon.rows[i], status: false}
         }
      
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
         'select c.id_calon, c.nama, c.foto, c.slogan, c.no_urut, a.id_admin, j.jabatan_tujuan FROM admins a JOIN calon c on c.id_admin = a.id_admin JOIN jabatan j on c.id_jabatan = j.id_jabatan WHERE a.id_admin = $1;', [
         req.user
      ])

      const length = Object.keys(calon.rows).length
      
      for(let i=0; i<length; i++){
         id_calon = calon.rows[i].id_calon

         partai = await pool.query(
            "select partai.* FROM partai_calon JOIN calon ON partai_calon.id_calon = calon.id_calon JOIN partai ON partai_calon.id_partai = partai.id_partai WHERE partai_calon.id_calon = $1;",
             [calon.rows[i].id_calon]
         )

         kota = await pool.query(
            "select kota.*, provinsi.provinsi FROM dapil_calon dapil JOIN calon ON dapil.id_calon = calon.id_calon JOIN kota ON dapil.id_kota = kota.id_kota JOIN provinsi ON kota.id_provinsi = provinsi.id_provinsi WHERE dapil.id_calon = $1;",
             [calon.rows[i].id_calon]
         )

         kecamatan = await pool.query(
            "select kecamatan.* FROM dapil_calon dapil JOIN calon ON dapil.id_calon = calon.id_calon JOIN kecamatan ON dapil.id_kecamatan = kecamatan.id_kecamatan WHERE dapil.id_calon = $1;",
             [calon.rows[i].id_calon]
         )

         posters = await pool.query(
            "select posters.* FROM posters WHERE id_calon = $1;",
             [calon.rows[i].id_calon]
         )

         pendidikan = await pool.query(
            "select pen.* FROM riwayat_pendidikan pen JOIN calon c ON pen.id_calon = c.id_calon WHERE pen.id_calon = $1",
            [id_calon]
         )

         pekerjaan = await pool.query(
            "select pek.* FROM riwayat_pekerjaan pek JOIN calon c ON pek.id_calon = c.id_calon WHERE pek.id_calon = $1",
            [id_calon]
         )
 
         j = 0
         calon.rows[i] = {...calon.rows[i], partai: partai.rows, kota: kota.rows, kecamatan:kecamatan.rows, posters:posters.rows, riwayat_pendidikan: pendidikan.rows, riwayat_pekerjaan: pekerjaan.rows}
         calon.rows[i] = {...calon.rows[i], status: false}
      }

      res.json(calon.rows)
   } catch(err) {
      res.json({ message: err })
   }
}

exports.selectCalonDPRDKotaByKota = async (req, res) => {
   const { id_kota } = req.params
   try{
      const calon = await pool.query(
         "SELECT c.id_calon, c.nama, c.foto, c.slogan, c.no_urut, a.id_admin, j.jabatan_tujuan, k.kecamatan, kt.kota FROM calon c JOIN admins a on c.id_admin = a.id_admin JOIN jabatan j on c.id_jabatan = j.id_jabatan JOIN dapil_calon ON dapil_calon.id_calon = c.id_calon JOIN kecamatan k ON dapil_calon.id_kecamatan = k.id_kecamatan JOIN kota kt ON k.id_kota = kt.id_kota WHERE c.id_jabatan = '50e62ddc-3229-4f3e-a922-a68061c0bb1d' AND kt.id_kota = $1 ORDER BY no_urut;",[
            id_kota
         ])

         const length = Object.keys(calon.rows).length
         
         for(let i=0; i<length; i++){
            id_calon = calon.rows[i].id_calon
   
            partai = await pool.query(
               "select partai.nama_partai, partai.logo_partai FROM partai_calon JOIN calon ON partai_calon.id_calon = calon.id_calon JOIN partai ON partai_calon.id_partai = partai.id_partai WHERE partai_calon.id_calon = $1;",
                [calon.rows[i].id_calon]
            )

            kota = await pool.query(
               "select kota.*, provinsi.provinsi FROM dapil_calon dapil JOIN calon ON dapil.id_calon = calon.id_calon JOIN kota ON dapil.id_kota = kota.id_kota JOIN provinsi ON kota.id_provinsi = provinsi.id_provinsi WHERE dapil.id_calon = $1;",
                [calon.rows[i].id_calon]
            )
   
            kecamatan = await pool.query(
               "select kecamatan.* FROM dapil_calon dapil JOIN calon ON dapil.id_calon = calon.id_calon JOIN kecamatan ON dapil.id_kecamatan = kecamatan.id_kecamatan WHERE dapil.id_calon = $1;",
                [calon.rows[i].id_calon]
            )
   
            j = 0
            calon.rows[i] = {...calon.rows[i], partai: partai.rows, kota: kota.rows, kecamatan:kecamatan.rows}
            calon.rows[i] = {...calon.rows[i], status: false}
         }
      
         res.json(calon.rows)
   } catch(err) {
      res.json({ message: err })
   }
}

exports.selectCalonDPRDProvByProv = async (req, res) => {
   const { id_provinsi } = req.params
   try{
      const calon = await pool.query(
         "SELECT c.id_calon, c.nama, c.foto, c.slogan, c.no_urut, a.id_admin, j.jabatan_tujuan, k.kota, p.provinsi FROM calon c JOIN admins a on c.id_admin = a.id_admin JOIN jabatan j on c.id_jabatan = j.id_jabatan JOIN dapil_calon ON dapil_calon.id_calon = c.id_calon JOIN kota k ON dapil_calon.id_kota = k.id_kota JOIN provinsi p on k.id_provinsi = p.id_provinsi WHERE c.id_jabatan = '3d9f2951-b519-4284-8e52-a10995536410' AND k.id_provinsi = $1 ORDER BY no_urut;",[
            id_provinsi
         ])

         const length = Object.keys(calon.rows).length
         
         for(let i=0; i<length; i++){
            id_calon = calon.rows[i].id_calon
   
            partai = await pool.query(
               "select partai.nama_partai, partai.logo_partai FROM partai_calon JOIN calon ON partai_calon.id_calon = calon.id_calon JOIN partai ON partai_calon.id_partai = partai.id_partai WHERE partai_calon.id_calon = $1;",
                [calon.rows[i].id_calon]
            )

            kota = await pool.query(
               "select kota.*, provinsi.provinsi FROM dapil_calon dapil JOIN calon ON dapil.id_calon = calon.id_calon JOIN kota ON dapil.id_kota = kota.id_kota JOIN provinsi ON kota.id_provinsi = provinsi.id_provinsi WHERE dapil.id_calon = $1;",
                [calon.rows[i].id_calon]
            )
   
            kecamatan = await pool.query(
               "select kecamatan.* FROM dapil_calon dapil JOIN calon ON dapil.id_calon = calon.id_calon JOIN kecamatan ON dapil.id_kecamatan = kecamatan.id_kecamatan WHERE dapil.id_calon = $1;",
                [calon.rows[i].id_calon]
            )
   
            j = 0
            calon.rows[i] = {...calon.rows[i], partai: partai.rows, kota: kota.rows, kecamatan:kecamatan.rows}
            calon.rows[i] = {...calon.rows[i], status: false}
         }
      
         res.json(calon.rows)
   } catch(err) {
      res.json({ message: err })
   }
}

exports.selectForSearch = async (req, res) => {
   var search = req.params.str
   try{
      const calon = await pool.query(

         "SELECT calon.id_calon, calon.nama, calon.foto, calon.slogan, calon.no_urut, admins.id_admin, jabatan.jabatan_tujuan FROM calon JOIN admins on calon.id_admin = admins.id_admin JOIN jabatan on calon.id_jabatan = jabatan.id_jabatan WHERE LOWER (calon.nama) LIKE LOWER ($1) ORDER BY no_urut;",[
            `%${search}%`
         ])

         const length = Object.keys(calon.rows).length
         
         for(let i=0; i<length; i++){
            id_calon = calon.rows[i].id_calon
   
            partai = await pool.query(
               "select partai.nama_partai, partai.logo_partai FROM partai_calon JOIN calon ON partai_calon.id_calon = calon.id_calon JOIN partai ON partai_calon.id_partai = partai.id_partai WHERE partai_calon.id_calon = $1;",
                [calon.rows[i].id_calon]
            )

            kota = await pool.query(
               "select kota.*, provinsi.provinsi FROM dapil_calon dapil JOIN calon ON dapil.id_calon = calon.id_calon JOIN kota ON dapil.id_kota = kota.id_kota JOIN provinsi ON kota.id_provinsi = provinsi.id_provinsi WHERE dapil.id_calon = $1;",
                [calon.rows[i].id_calon]
            )
   
            kecamatan = await pool.query(
               "select kecamatan.* FROM dapil_calon dapil JOIN calon ON dapil.id_calon = calon.id_calon JOIN kecamatan ON dapil.id_kecamatan = kecamatan.id_kecamatan WHERE dapil.id_calon = $1;",
                [calon.rows[i].id_calon]
            )
   
            j = 0
            calon.rows[i] = {...calon.rows[i], partai: partai.rows, kota: kota.rows, kecamatan:kecamatan.rows}
            calon.rows[i] = {...calon.rows[i], status: false}
         }
      
         res.json(calon.rows)
   } catch(err) {
      res.json({ message: err })
   }
}

exports.selectAllWakil = async (req, res) => {
   try{
      const wakil = await pool.query(
         "SELECT * FROM wakil;"
      )

      res.json(wakil.rows)
   } catch(err){
      res.json({ message: err })
   }
}

exports.selectCalonPresiden= async (req, res) => {
   const { id_jabatan } = req.params
   try{
      const calon = await pool.query(
         "SELECT calon.id_calon, calon.nama, calon.foto, calon.slogan, calon.no_urut, admins.id_admin, wakil.id_wakil, wakil.nama_wakil, jabatan.jabatan_tujuan FROM calon JOIN admins on calon.id_admin = admins.id_admin JOIN wakil ON calon.id_calon = wakil.id_calon JOIN jabatan on calon.id_jabatan = jabatan.id_jabatan WHERE calon.id_jabatan = $1 ORDER BY no_urut;",[
            id_jabatan
         ])

         const length = Object.keys(calon.rows).length
         
         for(let i=0; i<length; i++){
            id_calon = calon.rows[i].id_calon
   
            partai = await pool.query(
               "select partai.nama_partai, partai.logo_partai FROM partai_calon JOIN calon ON partai_calon.id_calon = calon.id_calon JOIN partai ON partai_calon.id_partai = partai.id_partai WHERE partai_calon.id_calon = $1;",
                [calon.rows[i].id_calon]
            )

            kota = await pool.query(
               "select kota.*, provinsi.provinsi FROM dapil_calon dapil JOIN calon ON dapil.id_calon = calon.id_calon JOIN kota ON dapil.id_kota = kota.id_kota JOIN provinsi ON kota.id_provinsi = provinsi.id_provinsi WHERE dapil.id_calon = $1;",
                [calon.rows[i].id_calon]
            )
   
            kecamatan = await pool.query(
               "select kecamatan.* FROM dapil_calon dapil JOIN calon ON dapil.id_calon = calon.id_calon JOIN kecamatan ON dapil.id_kecamatan = kecamatan.id_kecamatan WHERE dapil.id_calon = $1;",
                [calon.rows[i].id_calon]
            )
   
            j = 0
            calon.rows[i] = {...calon.rows[i], partai: partai.rows, kota: kota.rows, kecamatan:kecamatan.rows}
            calon.rows[i] = {...calon.rows[i], status: false}
         }
      
         res.json(calon.rows)
   } catch(err) {
      res.json({ message: err })
   }
}

exports.selectPresByUser = async (req, res) => {
   const {id_admin} = req.params
   try{
      const calon = await pool.query(
         "select c.id_calon, c.nama, c.foto, c.slogan, c.no_urut, a.id_admin, w.id_wakil, w.nama_wakil, j.jabatan_tujuan FROM calon c JOIN admins a ON c.id_admin = a.id_admin JOIN wakil w ON w.id_calon = c.id_calon JOIN jabatan j ON c.id_jabatan = j.id_jabatan WHERE c.id_admin = $1", [
         id_admin
      ])

      const length = Object.keys(calon.rows).length
      
      for(let i=0; i<length; i++){
         // id_calon = calon.rows[i].id_calon

         partai = await pool.query(
            "select partai.nama_partai, partai.logo_partai FROM partai_calon JOIN calon ON partai_calon.id_calon = calon.id_calon JOIN partai ON partai_calon.id_partai = partai.id_partai WHERE partai_calon.id_calon = $1;",
             [calon.rows[i].id_calon]
         )

         kota = await pool.query(
            "select kota.*, provinsi.provinsi FROM dapil_calon dapil JOIN calon ON dapil.id_calon = calon.id_calon JOIN kota ON dapil.id_kota = kota.id_kota JOIN provinsi ON kota.id_provinsi = provinsi.id_provinsi WHERE dapil.id_calon = $1;",
             [calon.rows[i].id_calon]
         )

         kecamatan = await pool.query(
            "select kecamatan.* FROM dapil_calon dapil JOIN calon ON dapil.id_calon = calon.id_calon JOIN kecamatan ON dapil.id_kecamatan = kecamatan.id_kecamatan WHERE dapil.id_calon = $1;",
             [calon.rows[i].id_calon]
         )

         pendidikan = await pool.query(
            "select pen.* FROM riwayat_pendidikan pen JOIN calon c ON pen.id_calon = c.id_calon WHERE pen.id_calon = $1",
            [calon.rows[i].id_calon]
         )

         pekerjaan = await pool.query(
            "select pek.* FROM riwayat_pekerjaan pek JOIN calon c ON pek.id_calon = c.id_calon WHERE pek.id_calon = $1",
            [calon.rows[i].id_calon]
         )

         j = 0
         calon.rows[i] = {...calon.rows[i], partai: partai.rows, kota: kota.rows, kecamatan:kecamatan.rows, riwayat_pendidikan: pendidikan.rows, riwayat_pekerjaan: pekerjaan.rows}
         calon.rows[i] = {...calon.rows[i], status: false}
      }

      res.json(calon.rows)
   } catch(err) {
      res.json({ message: err })
   }
}

exports.addWakil = async (req, res) => {
   try{
      const { id_calon } = req.body
      const { nama_wakil } = req.body

      const wakil = await pool.query(
         "INSERT INTO wakil(id_calon, nama_wakil) VALUES ($1, $2) RETURNING *",
      [id_calon, nama_wakil])

      res.json(wakil)
   } catch (err){
      console.error(err.message)
   }
}

exports.updateWakil = async (req, res) => {
   try{
      const { id_wakil } = req.params
      const { id_calon } = req.body
      const { nama_wakil } = req.body

      const update_wakil = await pool.query(
         "UPDATE wakil SET id_calon = $1, nama_wakil = $2 WHERE id_wakil = $3",
         [id_calon, nama_wakil, id_wakil]
      )

      res.json(update_wakil)
   } catch(err){
      console.error(err.message)
   }
}

exports.deleteWakil = async (req, res) => {
   try{
      const { id_wakil } = req.params

      const wakil = await pool.query(
         "DELETE FROM wakil WHERE id_wakil = $1",
         [id_wakil]
      )

      res.json("Wakil is deleted")
   } catch(err){
      res.json({ message: err })
   }
}

exports.addRiwayatPendidikanWakil = async (req, res) => {
   try{
      const { id_wakil} = req.body
      const { nama_institusi } = req.body
      const { detail } = req.body
      const { tahun_mulai } = req.body
      const { tahun_selesai } = req.body

      const wakil = await pool.query(
         "INSERT INTO riwayat_pendidikan(id_wakil, nama_institusi, detail_pendidikan, tahun_mulai_pendidikan , tahun_selesai_pendidikan) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [id_wakil, nama_institusi, detail, tahun_mulai, tahun_selesai])

      res.json(wakil)
   } catch (err){
      console.error(err.message)
   }
}

exports.addRiwayatPekerjaanWakil = async (req, res) => {
   try{
      const { id_wakil } = req.body
      const { nama_pekerjaan } = req.body
      const { detail } = req.body
      const { tahun_mulai } = req.body
      const { tahun_selesai } = req.body

      const wakil = await pool.query(
         "INSERT INTO riwayat_pekerjaan(id_wakil, nama_pekerjaan, detail_pekerjaan, tahun_mulai_pekerjaan, tahun_selesai_pekerjaan) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [id_wakil, nama_pekerjaan, detail, tahun_mulai, tahun_selesai])

      res.json(wakil)
   } catch (err){
      console.error(err.message)
   }
}

exports.updateRiwayatPekerjaan = async (req, res) => {
   try{
      const { id_pekerjaan } = req.params
      const { nama_pekerjaan } = req.body
      const { detail } = req.body
      const { tahun_mulai } = req.body
      const { tahun_selesai } = req.body

      const update_pekerjaan = await pool.query(
         "UPDATE riwayat_pekerjaan SET nama_pekerjaan = COALESCE (NULLIF($1, ''), nama_pekerjaan), detail_pekerjaan = COALESCE (NULLIF($2, ''), detail_pekerjaan), tahun_mulai_pekerjaan = COALESCE (NULLIF($3, ''), tahun_mulai_pekerjaan), tahun_selesai_pekerjaan = COALESCE (NULLIF($4, ''), tahun_selesai_pekerjaan) WHERE id_pekerjaan = $5 RETURNING *;",
         [nama_pekerjaan, detail, tahun_mulai, tahun_selesai, id_pekerjaan]
      )

      res.json(update_pekerjaan.rows)
   } catch(err){
      console.log(err)
   }
}

exports.updateRiwayatPendidikan = async (req, res) => {
   try{
      const { id_pendidikan } = req.params
      const { nama_institusi } = req.body
      const { detail } = req.body
      const { tahun_mulai } = req.body
      const { tahun_selesai } = req.body

      const update_pendidikan = await pool.query(
         "UPDATE riwayat_pendidikan SET nama_institusi = COALESCE (NULLIF($1, ''), nama_institusi), detail_pendidikan = COALESCE (NULLIF($2, ''), detail_pendidikan), tahun_mulai_pendidikan = COALESCE (NULLIF($3, ''), tahun_mulai_pendidikan), tahun_selesai_pendidikan = COALESCE (NULLIF($4, ''), tahun_selesai_pendidikan) WHERE id_pendidikan = $5 RETURNING *;",
         [nama_institusi, detail, tahun_mulai, tahun_selesai, id_pendidikan]
      )

      res.json(update_pendidikan.rows)
   } catch(err){
      console.log(err)
   }
}

exports.deleteRiwayatPekerjaan = async (req, res) => {
   try{
      const { id_pekerjaan } = req.params

      const riwayat_pekerjaan = await pool.query(
         "DELETE FROM riwayat_pekerjaan WHERE id_pekerjaan = $1",
         [id_pekerjaan]
      )

      res.json("Riwayat pekerjaan berhasil dihapus")
   } catch(err){
      res.json({ message: err })
   }
}

exports.deleteRiwayatPendidikan = async (req, res) => {
   try{
      const { id_pendidikan } = req.params

      const riwayat_pendidikan = await pool.query(
         "DELETE FROM riwayat_pendidikan WHERE id_pendidikan = $1",
         [id_pendidikan]
      )

      res.json("Riwayat pendidikan berhasil dihapus")
   } catch(err){
      res.json({ message: err })
   }
}

exports.deletePosters = async (req, res) => {
   try{
      const { id_posters } = req.params

      const posters = await pool.query(
         "DELETE FROM posters WHERE id_posters = $1",
         [id_posters]
      )

      res.json("Poster dan slogan berhasil dihapus")
   } catch(err){
      res.json({ message: err })
   }
}


exports.selectPostersById = async (req, res) => {
   const {id_calon} = req.params
   try{
      const posters = await pool.query(
         "select * from posters WHERE id_calon = $1;", [
            id_calon
      ])

      res.json(posters.rows[0])
   } catch(err) {
      res.json({ message: err })
   }
}