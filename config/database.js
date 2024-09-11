const mysql = require('mysql2');
require('dotenv').config();

let conn;

const initDatabase = () => {
    conn = mysql.createConnection({
        host: process.env.DATABASEHOST,
        user: process.env.DATABASEUSER,
        password: process.env.DATABASEPASSWORD
    });

    conn.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASENAME}`, (err, result) => {
        if (err) {
            console.log("Error creating database:", err.message);
            return;
        }
        console.log(`Database ${process.env.DATABASENAME} created or exists.`);

        conn.changeUser({ database: process.env.DATABASENAME }, (err) => {
            if (err) {
                console.log('Error connecting to the database:', err.message);
                return;
            }

            const queryCreateTableCars = `
            CREATE TABLE IF NOT EXISTS cars ( 
                id INT AUTO_INCREMENT PRIMARY KEY, 
                brand VARCHAR(200) NOT NULL, 
                model VARCHAR(200) NOT NULL, 
                year INT NOT NULL
            );`;

            conn.query(queryCreateTableCars, (err, result) => {
                if (err) {
                    console.log("Error creating 'cars' table:", err.message);
                    return;
                }
                console.log("Table 'cars' created or exists.");

                const queryCreateTableCarsItems = `
                CREATE TABLE IF NOT EXISTS cars_items ( 
                    id INT AUTO_INCREMENT PRIMARY KEY, 
                    name VARCHAR(200) NOT NULL, 
                    car_id INT NOT NULL,
                    FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE ON UPDATE CASCADE
                );`;

                conn.query(queryCreateTableCarsItems, (err, result) => {
                    if (err) {
                        console.log("Error creating 'cars_items' table:", err.message);
                        return;
                    }
                    console.log("Table 'cars_items' created or exists.");
                });
            });
        });
    });
};

module.exports = { conn, initDatabase };