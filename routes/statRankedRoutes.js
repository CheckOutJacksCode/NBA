const express = require('express');
const router = express.Router();
const statRanked = require('../services/statRankedQueries');
const { checkAuthenticated } = require('./userRouter');

router.get(`/:season`, statRanked.getRankedStats);

router.get(`/boxScores/:season`, statRanked.getRankedBoxScores);

router.get(`/:stat/:season`, statRanked.getRankedPlayersByStat);


module.exports = router;