const { pool } = require("../dbConfig")

exports.selectAllProvinsi = async (req, res) => {
   try{
      const provinsi = await pool.query(
         "SELECT * from provinsi ORDER BY provinsi"
      )

      res.json(provinsi.rows)
   } catch(err){
      res.json({ message: err })
   }
}

exports.addProvinsi = async (req, res) => {
	try{
		const { provinsi } = req.body

		const add_provinsi = await pool.query(
			"INSERT INTO provinsi(provinsi) VALUES($1) RETURNING *",
			[provinsi]
		)

		res.json(add_provinsi)
	} catch(err) {
		console.error(err.message)
	}
 }

exports.updateProvinsi = async (req, res) => {
	try{
		const { id_provinsi } = req.params
		const { provinsi } = req.body

		const update_provinsi = await pool.query(
			"UPDATE provinsi SET provinsi = $1 WHERE id_provinsi = $2",
			[provinsi, id_provinsi]
		)

		res.json(update_provinsi)
	} catch(err) {
		console.error(err.message)
	}
}

exports.deleteProvinsi = async (req, res) => {
	try{
		const { id_provinsi } = req.params

		const provinsi = await pool.query(
			"DELETE FROM provinsi WHERE id_provinsi = $1", [
					id_provinsi
			]
		)

		res.json("Provinsi is deleted")
	} catch (err) {
		res.json({ message: err })
		console.log(err)
	}
}

exports.selectProvinsiById = async (req, res) => {
	try{
		const {id_provinsi} = req.params

		const provinsi = await pool.query(
			"SELECT * from provinsi WHERE id_provinsi = $1",
			[id_provinsi]
		)

		res.json(provinsi.rows[0])
	} catch(err){
		res.json({ message: err })
	}
}

exports.selectAllKota = async (req, res) => {
	try{
		const kota = await pool.query(
			"SELECT * from kota, provinsi where kota.id_provinsi = provinsi.id_provinsi ORDER BY provinsi"
		)

		res.json(kota.rows)
	} catch(err){
		res.json({ message: err })
	}
}

 exports.addKota = async (req, res) => {
	try{
		const { id_provinsi } = req.body
		const { kota } = req.body

		const add_kota = await pool.query(
			"INSERT INTO kota(id_provinsi, kota) VALUES($1, $2) RETURNING *",
			[id_provinsi, kota]
		)

		res.json(add_kota)
	} catch(err) {
		console.error(err.message)
	}
}

exports.updateKota = async (req, res) => {
	try{
		const { id_kota } = req.params
		const { id_provinsi } = req.body
		const { kota } = req.body

		const update_kota = await pool.query(
			"UPDATE kota SET id_provinsi = $1, kota = $2 WHERE id_kota = $3",
			[id_provinsi, kota, id_kota]
		)

		res.json(update_kota)
	} catch(err) {
		console.error(err.message)
	}
}

exports.deleteKota = async (req, res) => {
	try{
		const { id_kota } = req.params

		const kota = await pool.query(
			"DELETE FROM kota WHERE id_kota = $1", [
				id_kota
			]
		)

		res.json("Kota is deleted")
	} catch (err) {
		res.json({ message: err })
	}
}

exports.selectKotaById = async (req, res) => {
	try{
		const {id_kota} = req.params

		const kota = await pool.query(
			"SELECT * from kota WHERE id_kota = $1",
			[id_kota]
		)

		res.json(kota.rows[0])
	} catch(err){
		res.json({ message: err })
	}
}

exports.selectKotaByIdProvinsi = async (req, res) => {
	try{
		const {id_provinsi} = req.params

		const kota = await pool.query(
			"SELECT * from kota WHERE id_provinsi = $1",
			[id_provinsi]
		)

		res.json(kota.rows)
	} catch(err){
		res.json({ message: err })
	}
}

exports.selectAllKecamatan = async (req, res) => {
	try{
		const kecamatan = await pool.query(
			"SELECT * from kecamatan, kota where kecamatan.id_kota = kota.id_kota ORDER BY kota"
		)

		res.json(kecamatan.rows)
	} catch(err){
		res.json({ message: err })
	}
}

 exports.addKecamatan = async (req, res) => {
	try{
		const { id_kota } = req.body
		const { kecamatan } = req.body

		const add_kecamatan = await pool.query(
			"INSERT INTO kecamatan(id_kota, kecamatan) VALUES($1, $2) RETURNING *",
			[id_kota, kecamatan]
		)

		res.json(add_kecamatan)
	} catch(err) {
		console.error(err.message)
	}
}

exports.updateKecamatan = async (req, res) => {
	try{
		const { id_kecamatan } = req.params
		const { id_kota } = req.body
		const { kecamatan } = req.body

		const update_kecamatan = await pool.query(
			"UPDATE kecamatan SET id_kota = $1, kecamatan = $2 WHERE id_kecamatan = $3",
			[id_kota, kecamatan, id_kecamatan]
		)

		res.json(update_kecamatan)
	} catch(err) {
		console.error(err.message)
	}
}

exports.deleteKecamatan = async (req, res) => {
	try{
		const { id_kecamatan } = req.params

		const kecamatan = await pool.query(
			"DELETE FROM kecamatan WHERE id_kecamatan = $1", [
				id_kecamatan
			]
		)

		res.json("Kecamatan is deleted")
	} catch (err) {
		res.json({ message: err })
		console.log(err)
	}
}

exports.selectKecamatanById = async (req, res) => {
	try{
		const {id_kecamatan} = req.params

		const kecamatan = await pool.query(
			"SELECT * from kecamatan WHERE id_kecamatan = $1",
			[id_kecamatan]
		)

		res.json(kecamatan.rows[0])
	} catch(err){
		res.json({ message: err })
	}
}

exports.selectKecamatanByIdKota = async (req, res) => {
	try{
		const {id_kota} = req.params

		const kecamatan = await pool.query(
			"SELECT * from kecamatan WHERE id_kota = $1",
			[id_kota]
		)

		res.json(kecamatan.rows)
	} catch(err){
		res.json({ message: err })
	}
}

exports.addKotaToDapil = async (req, res) => {
	try{
	   const { id_calon } = req.body
	   const { id_kota } = req.body
	   const { id_kecamatan } = req.body
 
	   const kota = await pool.query(
		  "INSERT INTO dapil_calon(id_calon, id_kota, id_kecamatan) VALUES($1, $2, $3) RETURNING *",
		  [id_calon, id_kota,id_kecamatan]
	   )
 
	   res.json(kota)
	} catch(err) {
	   console.error(err.message)
	}
 }

 exports.addKecamatanToDapil = async (req, res) => {
	try{
	   const { id_calon } = req.body
	   const { id_kota } = req.body
	   const { id_kecamatan } = req.body
 
	   const kecamatan = await pool.query(
		  "INSERT INTO dapil_calon(id_calon, id_kota, id_kecamatan) VALUES($1, $2, $3) RETURNING *",
		  [id_calon, id_kota, id_kecamatan]
	   )
 
	   res.json(kecamatan)
	} catch(err) {
	   console.error(err.message)
	}
 }

 exports.selectKotaCalon = async (req, res) => {
    try{
        const { id_calon } = req.params 

       const kota = await pool.query(
          "select kota.kota FROM dapil_calon JOIN calon ON dapil_calon.id_calon = calon.id_calon JOIN kota ON dapil_calon.id_kota = kota.id_kota WHERE dapil_calon.id_calon = $1;",
          [id_calon]
       )
 
       res.json(kota.rows)
    } catch(err){
       res.json({ message: err })
    }
 }

 exports.selectKecamatanCalon = async (req, res) => {
    try{
        const { id_calon } = req.params 

       const kecamatan = await pool.query(
          "select kecamatan.kecamatan FROM dapil_calon JOIN calon ON dapil_calon.id_calon = calon.id_calon JOIN kecamatan ON dapil_calon.id_kecamatan = kecamatan.id_kecamatan WHERE dapil_calon.id_calon = $1;",
          [id_calon]
       )
 
       res.json(kecamatan.rows)
    } catch(err){
       res.json({ message: err })
    }
 }

 exports.selectDapilCalon = async (req, res) => {
    try{
        const { id_calon } = req.params 

       const partai = await pool.query(
          "select kota.kota FROM dapil_calon JOIN calon ON dapil_calon.id_calon = calon.id_calon JOIN kota ON dapil_calon.id_kota = kota.id_kota WHERE dapil_calon.id_calon = $1;",
          [id_calon]
       )
 
       res.json(partai.rows)
    } catch(err){
       res.json({ message: err })
    }
 }