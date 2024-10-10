const axios = require('axios');
const CryptoPrice = require('../models/CryptoPrice'); // Your Mongoose model

// Function to fetch cryptocurrency prices from CoinGecko
const fetchCryptoPrices = async () => {
    try {
        const coins = ['bitcoin', 'matic-network', 'ethereum'];
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;
        
        // Log the URL for debugging
        console.log('Fetching prices from:', url);
        
        const response = await axios.get(url);
        
        const prices = response.data;
        
        // Log the response data for debugging
        console.log('Prices fetched:', prices);
        
        // Create price objects to save in the database
        const priceData = coins.map((coin) => ({
          coin: coin,
          price: prices[coin].usd,
          marketCap: prices[coin].usd_market_cap,
          change24h: prices[coin].usd_24h_change,
        }));
    
        // Save each coin's data to the database
        await CryptoPrice.insertMany(priceData);
    
        return priceData;
      } catch (error) {
        console.error('Error fetching crypto prices:', error);
        throw new Error('Failed to fetch prices from CoinGecko.');
      }
    };

// Function to calculate the standard deviation for a cryptocurrency's price
const calculateDeviation = async (coin) => {
  try {
    // Fetch the latest 100 price records for the specified coin
    const prices = await CryptoPrice.find({ coin })
      .sort({ createdAt: -1 }) // Sort by latest createdAt
      .limit(100)
      .select('price -_id'); // Exclude _id for cleaner output

    if (prices.length < 2) {
      throw new Error('Not enough price data to calculate deviation');
    }

    // Extract price values
    const priceValues = prices.map((price) => price.price);

    // Calculate the mean (average)
    const mean = priceValues.reduce((a, b) => a + b, 0) / priceValues.length;

    // Calculate the variance
    const variance = priceValues.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) / priceValues.length;

    // Standard deviation is the square root of variance
    const standardDeviation = Math.sqrt(variance);

    return standardDeviation; // Return the calculated standard deviation
  } catch (error) {
    console.error('Error calculating standard deviation:', error.message);
    throw new Error('Failed to calculate standard deviation.');
  }
};

module.exports = {
  fetchCryptoPrices,
  calculateDeviation,
};
