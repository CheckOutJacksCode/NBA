const express = require('express');
const router = express.Router();
const boxScoreSummary = require('../services/boxScoreSummaryQueries');

router.get('/read/:season', boxScoreSummary.getBoxScoreSummaryFromCSV);

router.post(`/:season`, boxScoreSummary.createBoxScoreSummary);


router.get(`/boxscoresummary/:season`, boxScoreSummary.createBoxScoreSummary);

router.get(`/home/gameids/:season/:team_id`, boxScoreSummary.getHomeGameIdsBySeason);

router.get(`/visitor/gameids/:season/:team_id`, boxScoreSummary.getVisitorGameIdsBySeason);

router.get(`/lengthofseason/:season/:teamid/:H_or_V`, boxScoreSummary.getLengthOfSeason);

module.exports = router;