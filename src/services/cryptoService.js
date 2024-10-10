const axios = require('axios');
const CryptoPrice = require('../models/CryptoPrice');
const cron = require('node-cron');

const fetchCryptoData = async () => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
                vs_currency: 'usd',
                ids: 'bitcoin,ethereum,matic-network'
            }
        });

        const cryptos = response.data;

        // Save each cryptocurrency to the database
        for (const crypto of cryptos) {
            const newPrice = new CryptoPrice({
                coin: crypto.id,
                price: crypto.current_price,
                marketCap: crypto.market_cap,
                change24h: crypto.price_change_percentage_24h
            });
            await newPrice.save();
        }
        console.log('Crypto data successfully saved');
    } catch (error) {
        console.error('Error fetching crypto data:', error.message);
    }
};

// Run every 2 hours
cron.schedule('0 */2 * * *', fetchCryptoData);