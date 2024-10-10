const {getCryptoStats, getStandardDeviation} = require('../services/cryptoService');
// Get the latest stats for a specific cryptocurrency
const getCryptoStatsController = async (req, res) => {
    const { coin } = req.query;
    const response = await getCryptoStats(coin);
    if(response.success) { return res.json(response.data) };
    return res.json(response);
};

// Get the standard deviation of the price of a cryptocurrency
const getStandardDeviationController = async (req, res) => {
    const { coin } = req.query;
    const response = await getStandardDeviation(coin);
    if(response.success) { return res.json(response.data) };
    return res.json(response);
};

module.exports = { getCryptoStatsController, getStandardDeviationController};