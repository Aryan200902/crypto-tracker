const { fetchCryptoPrices, calculateDeviation } = require('../services/cryptoService');

// Controller function to get cryptocurrency prices
const getCryptoData = async (req, res) => {
  try {
    const prices = await fetchCryptoPrices();
    res.status(200).json(prices);
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    res.status(500).json({ message: 'Failed to fetch cryptocurrency prices', error: error.message });
  }
};

// Controller function to get standard deviation of prices for a specific coin
const getStandardDeviation = async (req, res) => {
  try {
    const { coin } = req.query;

    if (!coin) {
      return res.status(400).json({ message: 'Coin query parameter is required' });
    }

    const deviation = await calculateDeviation(coin);
    res.status(200).json({ deviation: deviation.toFixed(2) });
  } catch (error) {
    console.error('Error calculating standard deviation:', error);
    res.status(500).json({ message: 'Failed to calculate standard deviation', error: error.message });
  }
};

module.exports = {
  getCryptoData,
  getStandardDeviation,
};