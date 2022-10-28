const express = require('express');
const router = express.Router();
const boxServices = require('../services/boxServices');

router.post('/:season', boxServices.createBoxScores);

router.get('/read/:season', boxServices.boxScoreLoad);

module.exports = router;