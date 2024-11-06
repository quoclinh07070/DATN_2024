// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const path = require('path');

// // const productRoutes = require('./src/routes/productRoutes');
// const db = require('./src/config/db'); // Nhập db từ config
// const postcategoryRoutes = require('./src/routes/postcategory/index');

// // Load environment variables from .env file
// dotenv.config();

// const app = express();

// // Middleware to parse JSON
// app.use(express.json());
// // Use CORS middleware
// app.use(cors());

// app.use('/api', postcategoryRoutes);

// // Routes
// // app.use('/api', productRoutes);
// app.use('/api', require("./src/routes/index"));

// // Middleware để phục vụ tệp tĩnh
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// app.use((req,res,next) => {
//   const error = new Error('Not Found')
//   error.status = 404
//   next(error)
// })

// // app.use((error,req,res,next) => {
// //   const statusCode = error.status || 500
// //   return  res.status(statusCode).json({
// //     status : 'error',
// //     code :statusCode,
// //     stack:error.stack,
// //     message: error.message || 'Internal Server Error'
// //   })
// // })

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const postRoutes = require('./src/routes/postRoutes');
const voucherRoutes = require('./src/routes/voucherRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const productRoutes = require('./src/routes/productRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const postcategoryRoutes = require('./src/routes/postcategoryRoutes');
// const userRoutes = require('./src/routes/userRoutes');

const db = require('./src/config/db'); // Nhập db từ config

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());
// Use CORS middleware
app.use(cors());

// Middleware để phục vụ tệp tĩnh
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', productRoutes);
app.use('/api', postRoutes);
app.use('/api', voucherRoutes);
app.use('/api', orderRoutes);
app.use('/api', categoryRoutes);
app.use('/api', postcategoryRoutes);
// app.use('/api', userRoutes);



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
