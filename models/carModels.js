const connection = require("../config/database")

const { createCar } = require("../controller/carController");

const car = {
    create: (data, callback) => {
        connection.query('INSERT INTO cars SET ?', data, (err, result) => {
            if (err) throw err;
            callback(result)
        })
    }
}