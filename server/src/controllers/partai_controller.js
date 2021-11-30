const { pool } = require("../dbConfig")

exports.selectAllPartai = async (req, res) => {
   try{
      const partai = await pool.query(
         "SELECT * from partai"
      )

      res.json(partai.rows)
   } catch(err){
      res.json({ message: err })
   }
}

exports.addPartai = async (req, res) => {
    try{
       const { nama_partai } = req.body
 
       const partai = await pool.query(
          "INSERT INTO partai(nama_partai) VALUES($1) RETURNING *",
          [nama_partai]
       )
 
       res.json(partai)
    } catch(err) {
       console.error(err.message)
    }
 }

exports.updatePartai = async (req, res) => {
    try{
        const { id_partai } = req.params
       const { nama_partai } = req.body
 
       const partai = await pool.query(
          "UPDATE partai SET nama_partai = $1 WHERE id_partai = $2",
          [nama_partai, id_partai]
       )
 
       res.json(partai)
    } catch(err) {
       console.error(err.message)
    }
 }
 
exports.deletePartai = async (req, res) => {
    try{
       const { id_partai } = req.params
 
       const partai = await pool.query(
          "DELETE FROM partai WHERE id_partai = $1", [
            id_partai
          ]
       )
 
       res.json("Partai is deleted")
    } catch (err) {
       res.json({ message: err })
    }
 }

 exports.selectPartaiCalon = async (req, res) => {
    try{
        const { id_calon } = req.params 

       const partai = await pool.query(
          "select partai.nama_partai FROM partai_calon JOIN calon ON partai_calon.id_calon = calon.id_calon JOIN partai ON partai_calon.id_partai = partai.id_partai WHERE partai_calon.id_calon = $1;",
          [id_calon]
       )
 
       res.json(partai.rows)
    } catch(err){
       res.json({ message: err })
    }
 }