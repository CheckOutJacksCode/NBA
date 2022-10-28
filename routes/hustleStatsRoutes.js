const express = require('express');
const router = express.Router();
const hustleStats = require('../services/hustleStatsQueries');

router.post('/:season', hustleStats.createLeagueHustleStatsBySeason);
router.get('/getLocalHustlePointsInSeason/:season', hustleStats.getAllFirstLastHustlePointsInSeason);
router.post('/', hustleStats.createPlayerHustlePoints);
router.get('/leaguehustlestats/:season', hustleStats.getLeagueHustleStatsBySeason);

module.exports = router;
