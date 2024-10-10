const express = require('express');
const { getCryptoData, getStandardDeviation } = require('../controllers/cryptoController');

const router = express.Router();

router.get('/prices', getCryptoData);
router.get('/deviation', getStandardDeviation);

module.exports = router;