const express = require('express');
const router = express.Router();

const rdController = require('../controllers/rdController');
const waboostyController = require('../controllers/waboostyController');

router.post('/rd-station', rdController.processaLeadRd);
router.post('/waboosty', waboostyController.processaStatusWaboosty);

module.exports = router;