const {getCoinDetails} = require('../api/getCoinDetails.api');

/**
 * @dev Fetches Cryptocurrency price, market cap and 24hr change for bitcoin, matic-network and ethereum and stores them in database
 */
const fetchCryptoPrices = async () => {
    const CryptoPrice = require('../models/CryptoPrice');
    const coins = ['bitcoin', 'matic-network', 'ethereum'];
    const results = [];
    for (const coin of coins) {
        const data = await getCoinDetails(coin);
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