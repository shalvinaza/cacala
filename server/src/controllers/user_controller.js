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
         return res.status(401).send("User already exists")
      }

      //3. Bcrypt the user password
      const bcryptPass = await bcryptPassword(password)

      //4. enter the new user inside our database
      const newUser = await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
         [username, email, bcryptPass]
      )

      //5. generating our jwt token
      const token = jwtGenerator(newUser.rows[0].id_user)

      res.json({ token })
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
         return res.status(401).json("Password or email is incorrect")
      }

      //3. check if incomming password is the same as the database password
      const validPassword = await bcrypt.compare(
         password,
         user.rows[0].password
      )

      if(!validPassword){
         return res.status(401).json("Password or email is incorrect")
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
      const user = await pool.query("SELECT * FROM users WHERE id_user = $1", [
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
      const { id } = req.params
      const { username } = req.body
      const { email } = req.body
      const { password } = req.body

      //bcrypt user password
      const bcryptPass = await bcryptPassword(password)

      const user = await pool.query("UPDATE users SET username = $1, email = $2, password = $3 WHERE id_user = $4", [
         username, email, bcryptPass, id
      ])

      res.json("User detail is updated")
   } catch (err) {
      res.json({ message: err })
   }
}