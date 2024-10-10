const express = require('express');
const connectDB = require('./config/db');
const fetchCryptoPrices = require('./jobs/fetchCryptoPricesJob');
const cron = require('node-cron');
const cryptoRoutes = require('./routes/cryptoRoutes');


const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use('/api', cryptoRoutes);

// Schedule the background job to run every 2 hours
cron.schedule('0 */2 * * *', () => {
    console.log('Fetching crypto prices...');
    fetchCryptoPrices();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});