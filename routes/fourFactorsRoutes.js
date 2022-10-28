const express = require('express');
const router = express.Router();
const fourFactors = require('../services/fourFactorsQueries');

router.get('/read/:season', fourFactors.getBoxScoreFourFactorsFromCSV);

router.post(`/:season`, fourFactors.createBoxScoreFourFactors);

router.get('/teams/read/:season', fourFactors.getBoxScoreFourFactorsTeamsFromCSV);

router.post(`/fourFactors/teams/:season`, fourFactors.createBoxScoreFourFactorsTeams);

router.get(`/home/:playerid/:season`, fourFactors.getBoxScoreFourFactorsVisitor);

router.get(`/visitor/:playerid/:season`, fourFactors.getBoxScoreFourFactorsHome);

module.exports = router;