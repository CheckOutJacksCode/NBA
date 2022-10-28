const express = require('express');
const router = express.Router();
const boxScoreScoring = require('../services/boxScoreScoringQueries');


router.get('/read/:season', boxScoreScoring.getBoxScoreScoringFromCSV);

router.post(`/:season`, boxScoreScoring.createBoxScoreScoring);

router.get('/teams/read/:season', boxScoreScoring.getBoxScoreScoringTeamsFromCSV);

router.post(`/teams/:season`, boxScoreScoring.createBoxScoreScoringTeams);

module.exports = router;
