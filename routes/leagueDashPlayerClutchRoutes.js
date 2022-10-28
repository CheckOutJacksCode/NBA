const express = require('express');
const router = express.Router();
const dashPlayerClutch = require('../services/leagueDashPlayerClutchQueries');

router.get('/read/:season', dashPlayerClutch.getLeagueDashPlayerClutchFromJson);

router.post(`/:season`, dashPlayerClutch.createLeagueDashPlayerClutch);

module.exports = router;