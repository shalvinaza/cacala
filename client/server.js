const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

const app = express()

app.use('*', (req, res, next) => {
    res.sendFile(path.join(__dirname,'/dist'))})

const port = process.env.PORT || 9090
app.listen(port)

console.log('Listening on port: ' + port)