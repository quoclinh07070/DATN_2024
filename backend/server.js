const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const productRoutes = require('./src/routes/productRoutes');
const db = require('./src/config/db'); // Nhập db từ config

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());
// Use CORS middleware
app.use(cors());

// Routes
app.use('/api', productRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
