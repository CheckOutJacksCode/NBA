const express = require('express');
const router = express.Router();
const dashPlayerPtShot = require('../services/leagueDashPlayerPtShotQueries');

router.get('/read/:season', dashPlayerPtShot.getLeagueDashPlayerPtShotFromJson);

router.post(`/:season`, dashPlayerPtShot.createLeagueDashPlayerPtShot);

router.get('/read/leaguedashplayershotlocations/:season', dashPlayerPtShot.getLeagueDashPlayerShotLocationsFromJson);

router.post(`/leaguedashplayershotlocations/:season`, dashPlayerPtShot.createLeagueDashPlayerShotLocations);

module.exports = router;