const express = require('express');
const router = express.Router();
const dashLineups = require('../services/leagueDashLineupsQueries');

router.get('/read/:season', dashLineups.getLeagueDashLineupsFromJson);

router.post(`/:season`, dashLineups.createLeagueDashLineups);

module.exports = router;