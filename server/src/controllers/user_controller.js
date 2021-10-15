const { pool } = require("../../dbConfig")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../utils/jwtGenerator")
const validInfo = require("../middleware/validInfo")
const { verify } = require("jsonwebtoken")

exports.register = async (req, res) => {
   try{
      const { username, email, password } = req.body

      const user = await pool.query("SELECT * FROM users WHERE email = $1", [
         email
      ])

      if(user.rows.length !== 0){
         return res.status(401).send("User already exists")
      }

      const saltRound = 10
      const salt = await bcrypt.genSalt(saltRound)

      const bcryptPassword = await bcrypt.hash(password, salt)

      const newUser = await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
         [username, email, bcryptPassword]
      )

      const token = jwtGenerator(newUser.rows[0].id)

      res.json({ token })
   } catch (err){
      console.error(err.message)
      res.status(500).send("Server Error")
   }
}

exports.login = async (req, res) => {
   try{
      const { email, password } = req.body

      const user = await pool.query("SELECT * FROM users WHERE email = $1", [
         email
      ])

      if(user.rows.length === 0){
         return res.status(401).json("Password or email is incorrect")
      }

      const validPassword = await bcrypt.compare(
         password,
         user.rows[0].password
      )

      if(!validPassword){
         return res.status(401).json("Password or email is incorrect")
      }

      const token = jwtGenerator(user.rows[0].id)

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