const express = require('express');
const { getCryptoStats, getStandardDeviation } = require('../controllers/cryptoController');

const router = express.Router();

router.get('/stats', getCryptoStats);
router.get('/deviation', getStandardDeviation);

module.exports = router;