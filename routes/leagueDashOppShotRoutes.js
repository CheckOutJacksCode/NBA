const express = require('express');
const router = express.Router();
const dashOppPtShot = require('../services/leagueDashOppShotQueries');

router.get('/read/:season', dashOppPtShot.getLeagueDashOppPtShotFromJson);

router.post(`/:season`, dashOppPtShot.createLeagueDashOppPtShot);

module.exports = router;