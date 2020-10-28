// Import Dependencies
const express = require('express')

// Initialize Express Routing System
const urlRoutes = express.Router()

// Import Controller
const controller = require('../controllers/url.controller')

// Configure GET Endpoint
urlRoutes.get('/:slug', controller.getUrl)

// Configure POST Endpoint
urlRoutes.post('/new', controller.postUrl)

// Export Routing Module
module.exports = urlRoutes
