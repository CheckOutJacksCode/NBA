const express = require('express');
const router = express.Router();
const carmelo = require('../services/carmeloQueries');

router.post('/', carmelo.createPlayerCarmeloPoints);


router.get('/getLocalCarmeloPointsInSeason/:season', carmelo.getAllFirstLastCarmeloPointsInSeason);

module.exports = router;