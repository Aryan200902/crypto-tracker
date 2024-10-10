const express = require('express');
const dotenv = require('dotenv');
const cryptoRoutes = require('./src/routes/cryptoRoutes'); 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); 

// Routes
app.use('/api/crypto', cryptoRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});