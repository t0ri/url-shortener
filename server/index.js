// Initialize Virtual Environment
require('dotenv').config()

// Import Dependencies
const express = require('express')
const mongoose = require('mongoose')

// Import Routes
const urlRouter = require('./routes/url.routes')

// Environment Setup
const PORT = process.env.PORT || 8080
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/db'

// Database Connection
const db = mongoose.connect(DB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(res => res).catch(err => console.log(err))

// Initialize App
const app = express()

// Set Middleware
app.use(express.json())
app.use(express.static('client'))
app.use('/url', urlRouter)

// Start Server
app.listen(PORT, () => {
  console.info(`🔥🚀🌎Server listening at localhost:${PORT}`)
})
