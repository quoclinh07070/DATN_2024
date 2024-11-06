// const mysql = require('mysql2');
// const dotenv = require('dotenv');

// // Load environment variables
// dotenv.config();

// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

// db.connect((err) => {
//     if (err) {
//         console.error('Connection error', err);
//         return;
//     }
//     console.log('Connected to MySQL');
// });

// module.exports = db;



// src/config/db.js
const mysql = require('mysql2/promise'); // Sử dụng mysql2 với promise
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Tạo pool kết nối
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Xuất đối tượng db
module.exports = db;