const express = require('express');
const router = express.Router();
const boxScoreMisc = require('../services/boxScoreMiscQueries');

router.get('/read/:season', boxScoreMisc.getBoxScoreMiscFromCSV);

router.post(`/:season`, boxScoreMisc.createBoxScoreMisc);

router.get('/teams/read/:season', boxScoreMisc.getBoxScoreMiscTeamsFromCSV);

router.post(`/teams/:season`, boxScoreMisc.createBoxScoreMiscTeams);

module.exports = router;