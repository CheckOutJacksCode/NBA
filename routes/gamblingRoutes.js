const express = require('express');
const router = express.Router();
const gambling = require('../services/gamblingQueries');

router.get('/odds/:season', gambling.getOddsFromCSV);

router.post('/odds/:season', gambling.createOddsBySeason);

router.get(`/moneyline/home/:season/:homeTeam/:gamedate`, gambling.getHomeMoneyline);

router.get(`/moneyline/visitor/:season/:visitorTeam/:gamedate`, gambling.getVisitorMoneyline);

module.exports = router;