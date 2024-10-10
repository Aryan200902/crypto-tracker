const express = require('express');
const { getCryptoStatsController, getStandardDeviationController } = require('../controllers/cryptoController');

const router = express.Router();

router.get('/stats', getCryptoStatsController);
router.get('/deviation', getStandardDeviationController);

module.exports = router;