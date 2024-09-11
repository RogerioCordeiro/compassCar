const { conn } = require("../config/database");

const Car = {
    create: (data, callback) => {
        conn.query('INSERT INTO cars SET ?', data, (err, result) => {
            if (err) {
                console.log('Error: ', err.message);
                return callback(err);
            }
            callback(null, result);
        });
    }
};

module.exports = Car;