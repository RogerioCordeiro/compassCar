const express = require('express')
const router = express.Router()
const carController = require('../controller/carController')

router.post('/api/v1/cars', carController.createCar);

module.exports = router