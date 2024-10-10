const express = require('express');
const connectDB = require('./src/config/db');
const fetchCryptoPrices = require('./src/jobs/fetchCryptoPricesJob');
const cron = require('node-cron');
const cryptoRoutes = require('./src/routes/cryptoRoutes');


const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api', cryptoRoutes);

// Schedule the background job to run every 2 hours
cron.schedule('0 */2 * * *', () => {
    console.log('Fetching crypto prices...');
    fetchCryptoPrices();
});

// (async () => {
//     console.log('Fetching crypto prices instantly for development...');
//     await fetchCryptoPrices();
// })();

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});