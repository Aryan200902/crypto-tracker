const fetchCryptoPrices = async () => {
    const fetch = (await import('node-fetch')).default;
    const CryptoPrice = require('../models/CryptoPrice');

    const coins = ['bitcoin', 'matic-network', 'ethereum'];
    const results = [];

    for (const coin of coins) {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`);
        const data = await response.json();

        if (data[coin]) {
            const priceData = {
                coin: coin,
                price: data[coin].usd,
                marketCap: data[coin].usd_market_cap,
                change24h: data[coin].usd_24h_change,
                createdAt: new Date(),
            };
            results.push(priceData);
        }
    }

    try {
        await CryptoPrice.insertMany(results);
        console.log('Crypto prices saved to the database:', results);
    } catch (error) {
        console.error('Error saving crypto prices to the database:', error);
    }
};

module.exports = fetchCryptoPrices;