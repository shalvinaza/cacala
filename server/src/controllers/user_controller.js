const { pool } = require("../dbConfig")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../utils/jwtGenerator")
const bcryptPassword = require("../utils/bcryptPassword")

exports.register = async (req, res) => {
   try{
      //1. destructure the req.body (name, email, password)
      const { username, email, password } = req.body

      //2. check if user exists (if user exist then throw error)
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [
         email
      ])

      if(user.rows.length !== 0){
         return res.status(401).send("email sudah terdaftar")
      }

      //3. Bcrypt the user password
      const bcryptPass = await bcryptPassword(password)

      //4. enter the new user inside our database
      const newUser = await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
         [username, email, bcryptPass]
      )

      //5. generating our jwt token
      // const token = jwtGenerator(newUser.rows[0].id_user)

      res.json("Registrasi berhasil")
   } catch (err){
      console.error(err.message)
      res.status(500).send("Server Error")
   }
}

exports.login = async (req, res) => {
   try{
      //1. destructure the req.body
      const { email, password } = req.body

      //2. check if user doesn't exist (if not,throw err)
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [
         email
      ])

      if(user.rows.length === 0){
         return res.status(401).json("Email belum terdaftar")
      }

      //3. check if incomming password is the same as the database password
      const validPassword = await bcrypt.compare(
         password,
         user.rows[0].password
      )

      if(!validPassword){
         return res.status(401).json("Email atau kata sandi salah")
      }

      //4. give them the jwt token
      const token = jwtGenerator(user.rows[0].id_user)

      res.json({ token })
   } catch (err){
      console.err(err.message)
      res.status(500).send("Server Error")
   }
}

exports.selectAllUsers = async (req, res) => {
   try{
      const users = await pool.query("SELECT * FROM users")

      res.json(users.rows)
   } catch (err){
      res.json({message: err})
   }
}

exports.getUser = async (req, res) => {
   try{
      const user = await pool.query("SELECT username, email FROM users WHERE id_user = $1", [
         req.user
      ])
      res.json(user.rows[0])
   }catch (err) {
      console.error(err.message)
      res.status(500).json("Server Error")
   }
}

exports.updateUser = async (req, res) => {
   try{
      // const { id } = req.params
      const { username } = req.body
      const { email } = req.body
      // let password  = req.body

      // //bcrypt user password
      // const bcryptPass = await bcryptPassword(password)

      const user = await pool.query("UPDATE users SET username = COALESCE (NULLIF($1, ''), username), email = COALESCE (NULLIF($2, ''), email) WHERE id_user = $3;", [
         username, email, req.user
      ])

      res.json("Nama berhasil diubah")
   } catch (err) {
      console.log(err)
      res.json({ message: err })
   }
}

exports.updateUserPass = async (req, res) => {
   try{
      //const { id } = req.params
      const { password } = req.body

      //bcrypt user password
      const bcryptPass = await bcryptPassword(password)

      const user = await pool.query("UPDATE users SET password = $1 WHERE id_user = $2", [
         bcryptPass, req.user
      ])

      res.json("Kata sandi berhasil diubah")
   } catch (err) {
      res.json({ message: err })
   }
}

exports.followCalon = async (req, res) => {
   const { id_calon } = req.params
   try{
      const user = await pool.query(
         "INSERT INTO mengikuti_calon(id_user, id_calon) VALUES($1, $2);", [
            req.user, id_calon
         ]
      )

      res.json("Calon berhasil diikuti")
   } catch(err) {
      res.json({message: err})
   }
}

exports.totalFollowers = async (req, res) => {
   const { id_calon } = req.params
   try{
      const totalFollowers = await pool.query(
         "SELECT * FROM mengikuti_calon WHERE mengikuti_calon.id_calon = $1;", [
            id_calon
         ]
      )

      res.json(totalFollowers.rows)
   } catch(err) {
      res.json({message: err})
   }
}

exports.selectFollowedCalonByUser = async (req, res) => {
   try{
      const calon = await pool.query(
         "select users.username, users.email, calon.*, jabatan.jabatan_tujuan FROM mengikuti_calon JOIN users ON users.id_user= mengikuti_calon.id_user JOIN calon ON mengikuti_calon.id_calon = calon.id_calon JOIN jabatan on calon.id_jabatan = jabatan.id_jabatan WHERE mengikuti_calon.id_user = $1;",[
            req.user
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
   
            pendidikan = await pool.query(
               "select pen.* FROM riwayat_pendidikan pen JOIN calon c ON pen.id_calon = c.id_calon WHERE pen.id_calon = $1",
               [id_calon]
            )
   
            pekerjaan = await pool.query(
               "select pek.* FROM riwayat_pekerjaan pek JOIN calon c ON pek.id_calon = c.id_calon WHERE pek.id_calon = $1",
               [id_calon]
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

exports.statOnDetail = async (req, res) => {
   const { id_calon } = req.params
   try{
      const followed = await pool.query(
         "select users.username, users.email, calon.id_calon, calon.nama, jabatan.jabatan_tujuan FROM mengikuti_calon JOIN users ON users.id_user= mengikuti_calon.id_user JOIN calon ON mengikuti_calon.id_calon = calon.id_calon JOIN jabatan on calon.id_jabatan = jabatan.id_jabatan WHERE mengikuti_calon.id_user = $1 AND mengikuti_calon.id_calon = $2;",[
            req.user, id_calon
         ])
      
         res.json(followed.rows)
   } catch(err) {
      res.json({ message: err })
   }
}

exports.unfollowCalon = async (req, res) => {
   const { id_calon } = req.params
   try{
      const user = await pool.query(
         "DELETE FROM mengikuti_calon WHERE id_calon = $1 AND id_user = $2",
         [id_calon, req.user]
      )

      res.json("Anda berhenti mengikuti calon")
   } catch(err){
      res.json({message: err})
   }
}
exports.deleteAkun = async (req, res) => {
   // const { id_user } = req.params
   try{
      const user = await pool.query(
         "DELETE FROM users WHERE id_user = $1",
         [req.user]
      )

      res.json("Akun dihapus")
   } catch(err){
      res.json({message: err})
   }
}