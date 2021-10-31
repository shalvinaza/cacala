const express = require("express");
const app = express()
const cors = require("cors")
const { pool } = require("./dbConfig")
const bodyParser = require("body-parser")
require("dotenv/config")

app.use(express.json()) //req.body
app.use(cors())
app.use(bodyParser.json())

//ROUTES//
const authRoute = require("../src/routes/auth_route")
const userRoute = require("../src/routes/user_route")
const adminRoute = require("../src/routes/admin_route")
const calonRoute = require("../src/routes/calon_route")
const postRoute = require("../src/routes/post_route")

app.use("/auth", authRoute)
app.use("/user", userRoute)
app.use("/admin", adminRoute)
app.use("/calon", calonRoute)
app.use("/post", postRoute)

app.listen(process.env.PORT || 3000, () => {
   console.log("server is running on port 3000")
})