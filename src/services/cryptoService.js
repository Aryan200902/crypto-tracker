const CryptoPrice = require('../models/CryptoPrice');

// Get the latest stats for a specific cryptocurrency
const getCryptoStats = async (coin) => {
  if (!coin) {
      return {
        success: false,
        status: 400,
        error: 'Coin parameter is required.'
      };
  }
  try {
      const latestData = await CryptoPrice.findOne({ coin: coin }).sort({ createdAt: -1 });
      if (!latestData) {
          return {
            success: false,
            status: 404,
            error: `Not found: ${coin} Cryptocurrency`
          }
      }
      return {
        success: true,
        status: 200,
        data: {
          price: latestData.price,
          marketCap: latestData.marketCap,
          "24hChange": latestData.change24h,
        }
      }
  } catch (error) {
    return { success: false, status: 500, error: `Failed to fetch data: ${error.message}` };
  }
};

const getStandardDeviation = async (coin) => {
  if (!coin) {
    return {success: false, status: 400, error: 'Coin parameter is required.' };
  }
  try {
    const records = await CryptoPrice.find({ coin: coin }).sort({ createdAt: -1 });
    const prices = records.map(record => record.price);
    if (prices.length < 2) {
      return { success: false, status: 404, error: 'Not enough data to calculate deviation.' };
    }
    // Calculate mean
    const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;
    // Calculate variance
    const variance = prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) / prices.length;
    // Calculate standard deviation
    const deviation = Math.sqrt(variance);
    return { success: true, status: 200, data: { deviation: deviation.toFixed(2) }};
  } catch (error) {
    return { success: false, status: 500, error: `Error fetching data: ${error}` };
  }
};

module.exports = {
  getCryptoStats,
  getStandardDeviation
};