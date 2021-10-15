const express = require("express");
const app = express()
const cors = require("cors")
const { pool } = require("../dbConfig")
const bodyParser = require("body-parser")
require("dotenv/config")

app.use(express.json()) //req.body
app.use(cors())
app.use(bodyParser.json())

//ROUTES//
const userRoute = require("./routes/user_route")

app.use("/users", userRoute)


app.listen(process.env.PORT || 3000, () => {
   console.log("server is running on port 3000")
})