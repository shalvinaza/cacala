const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

const app = express()

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", function (req, res) {
       res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
  }

const port = process.env.PORT || 9090
app.listen(port)

console.log('Listening on port: ' + port)