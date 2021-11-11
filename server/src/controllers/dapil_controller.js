const { pool } = require("../dbConfig")

exports.selectAllProvinsi = async (req, res) => {
   try{
      const provinsi = await pool.query(
         "SELECT * from provinsi"
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
    }
}