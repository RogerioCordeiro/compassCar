const express = require('express')
const router = express.Router()

router.post('/api/v1/cars', carController.createCar);