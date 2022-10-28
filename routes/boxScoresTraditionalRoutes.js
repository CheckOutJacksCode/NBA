const express = require('express');
const router = express.Router();
const boxScoreTraditional = require('../services/boxscorestraditionalQueries')

router.get('/home/:playerid/:season', boxScoreTraditional.getBoxScoreTraditionalHome);

router.get('/visitor/:playerid/:season', boxScoreTraditional.getBoxScoreTraditionalVisitor);

router.post('/:season', boxScoreTraditional.createBoxScoresTraditional);

router.get('/read/:season', boxScoreTraditional.boxScoreTraditionalLoad);

router.get('/:season/:gameid/:playerid', boxScoreTraditional.getBoxScoresTraditional);

router.get('/playeridlist/:season', boxScoreTraditional.getOfficialPlayerIdList);

router.get('/playernameidlist/:season', boxScoreTraditional.getOfficialPlayerIdNameList);
router.get('/teamplayers/:teamid', boxScoreTraditional.getTeamPlayersFromTeamId);
router.get(`/getroster/:season/:team`, boxScoreTraditional.getRosterBySeasonByTeam);

router.get(`/jackarithm/:playerid/:season`, boxScoreTraditional.getBoxScoreTraditionalStats);

router.get(`/boxnum/:gameid/:season/:teamid/:H_or_V`, boxScoreTraditional.getBoxNumFromGameIdSeason)
router.get(`/jackarithm/home/:playerid/:season`, boxScoreTraditional.getBoxScoreTraditionalHome);

router.get(`/jackarithm/visitor/:playerid/:season`, boxScoreTraditional.getBoxScoreTraditionalVisitor);

router.get(`/previousgame/gameid/:season/:teamId`, boxScoreTraditional.getPreviousGameIdBySeasonByTeam);

router.get(`/previousgame/gameid/:season/:teamId/:gameid`, boxScoreTraditional.getPreviousRosterBySeasonByTeamByGameId);

module.exports = router;