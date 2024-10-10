const CryptoPrice = require('../models/CryptoPrice');

// /stats endpoint
exports.getLatestCryptoData = async (req, res) => {
    const { coin } = req.query;

    if (!['bitcoin', 'ethereum', 'matic-network'].includes(coin)) {
        return res.status(400).json({ error: 'Invalid coin parameter' });
    }

    try {
        const latestRecord = await CryptoPrice.findOne({ coin }).sort({ timestamp: -1 });
        if (!latestRecord) {
            return res.status(404).json({ error: 'No data available for this coin' });
        }

        res.json({
            price: latestRecord.price,
            marketCap: latestRecord.marketCap,
            change24h: latestRecord.change24h
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// /deviation endpoint
exports.getCryptoPriceDeviation = async (req, res) => {
    const { coin } = req.query;

    if (!['bitcoin', 'ethereum', 'matic-network'].includes(coin)) {
        return res.status(400).json({ error: 'Invalid coin parameter' });
    }

    try {
        const prices = await CryptoPrice.find({ coin }).sort({ timestamp: -1 }).limit(100).select('price');
        
        if (prices.length === 0) {
            return res.status(404).json({ error: 'No data available for this coin' });
        }

        // Extract prices and calculate standard deviation
        const priceValues = prices.map(p => p.price);
        const mean = priceValues.reduce((a, b) => a + b, 0) / priceValues.length;
        const variance = priceValues.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / priceValues.length;
        const standardDeviation = Math.sqrt(variance);

        res.json({ deviation: parseFloat(standardDeviation.toFixed(2)) });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};