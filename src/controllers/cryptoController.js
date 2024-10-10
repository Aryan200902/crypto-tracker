const CryptoPrice = require('../models/CryptoPrice');

// Get the latest stats for a specific cryptocurrency
const getCryptoStats = async (req, res) => {
    const { coin } = req.query;

    if (!coin) {
        return res.status(400).json({ error: 'Coin parameter is required.' });
    }

    try {
        const latestData = await CryptoPrice.findOne({ coin: coin }).sort({ createdAt: -1 });

        if (!latestData) {
            return res.status(404).json({ error: 'Cryptocurrency not found.' });
        }

        res.json({
            price: latestData.price,
            marketCap: latestData.marketCap,
            "24hChange": latestData.change24h,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data.' });
    }
};

// Get the standard deviation of the price of a cryptocurrency
const getStandardDeviation = async (req, res) => {
    const { coin } = req.query;

    if (!coin) {
        return res.status(400).json({ error: 'Coin parameter is required.' });
    }

    try {
        const records = await CryptoPrice.find({ coin: coin }).sort({ createdAt: -1 });
        const prices = records.map(record => record.price);

        if (prices.length < 2) {
            return res.status(404).json({ error: 'Not enough data to calculate deviation.' });
        }

        // Calculate mean
        const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;
        
        // Calculate variance
        const variance = prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) / prices.length;
        
        // Calculate standard deviation
        const deviation = Math.sqrt(variance);

        res.json({ deviation: deviation.toFixed(2) });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data.' });
    }
};

module.exports = { getCryptoStats, getStandardDeviation };
