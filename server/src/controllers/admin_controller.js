const { pool } = require("../dbConfig")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../utils/jwtGenerator")
const bcryptPassword = require("../utils/bcryptPassword")

exports.register = async (req, res) => {
   try{
      const { username, password, role } = req.body

      const admin = await pool.query("SELECT * FROM admins WHERE username = $1", [
         username
      ])

      if(admin.rows.length !== 0){
         return res.status(401).send("Admin already exists")
      }

      const bcryptPass = await bcryptPassword(password)

      const newAdmin = await pool.query("INSERT INTO admins (username, password, role) VALUES ($1, $2, $3) RETURNING *",
         [username, bcryptPass, role]
      )

      res.json(newAdmin)
   } catch (err){
      console.error(err.message)
      res.status(500).send("Server Error")
   }
}

exports.login = async (req, res) => {
   try{
      const { username, password } = req.body

      const admin = await pool.query("SELECT * FROM admins WHERE username = $1", [
         username
      ])

      if(admin.rows.length === 0){
         return res.status(401).json("admin tidak terdaftar")
      }

      const validPassword = await bcrypt.compare(
         password,
         admin.rows[0].password
      )

      if(!validPassword){
         return res.status(401).json("Nama atau kata sandi salah")
      }

      const token = jwtGenerator(admin.rows[0].id_admin)
      const role = admin.rows[0].role
      admin.rows[0] = {role: role, token: token}

      res.json(admin.rows[0])
   } catch (err){
      console.err(err.message)
      res.status(500).send("Server Error")
   }
}

exports.selectAllAdmins = async (req, res) => {
   try{
      const admins = await pool.query("SELECT * FROM admins")

      res.json(admins.rows)
   } catch (err){
      res.json({message: err})
   }
}

exports.getAdmin = async (req, res) => {
   try{
      const admin = await pool.query("SELECT * FROM admins WHERE id_admin = $1", [
         req.user
      ])
      res.json(admin.rows[0])
   }catch (err) {
      console.error(err.message)
      res.status(500).json("Server Error")
   }
}

exports.updateAdmin = async (req, res) => {
   try{
      const { id } = req.params
      const { username } = req.body
      const { password } = req.body
      const { role } = req.body

      const bcryptPass = await bcryptPassword(password)

      const admin = await pool.query("UPDATE admins SET username =  COALESCE (NULLIF($1, ''), username), password =  COALESCE (NULLIF($2, ''), password), role =  COALESCE (NULLIF($3, ''), role) WHERE id_admin = $4", [
         username, bcryptPass, role, id
      ])

      res.json("Data admin berhasil diubah")
   } catch (err) {
      res.json({ message: err })
   }
}

exports.totalFollowers = async (req, res) => {
   try{
      const totalFollowers = await pool.query(
         "SELECT c.id_calon, c.nama, a.id_admin, m.id_calon, m.id_user, u.username FROM admins a JOIN calon c on c.id_admin = a.id_admin JOIN mengikuti_calon m ON m.id_calon = c.id_calon JOIN users u ON m.id_user = u.id_user WHERE a.id_admin = $1;", [
            req.user
         ]
      )

      res.json(totalFollowers.rows)
   } catch(err) {
      res.json({message: err})
   }
}