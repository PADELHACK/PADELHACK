//routes

const express = require('express')
const router = express.Router()
const miscController = require('../controllers/misc.controller')

// Endpoints
router.get('/',miscController.goHome)

module.exports = router

