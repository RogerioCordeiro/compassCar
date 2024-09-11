const express = require('express')
const { initDatabase } = require('./config/database')
require('dotenv').config()
const carRoutes = require('./routes/carRoutes')
const app = express()
const port = process.env.port

initDatabase()

app.use(express.json())

app.use('/', carRoutes)

app.listen(port, () => {
    console.log(`Api started on http://localhost:${port}`)
})
