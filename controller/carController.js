const carModel = require('../models/carModels')

exports.createCar = (req, res) => {
    const newCar = req.body;

    carModel.create(newCar, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to create car.' });
        }
        res.status(201).json({ message: 'Car created successfully.' });
    });
};