const express = require('express');
const router = express.Router();
const boxPlayers = require('../services/boxPlayersQueries')

router.get(`/getroster/:season/:team`, boxPlayers.getRosterBySeasonByTeam);

router.get('/playeridlist/:season', boxPlayers.getOfficialPlayerIdList);
router.get('/playernameidlist/:season', boxPlayers.getOfficialPlayerIdNameList);
router.get('/teamplayers/:teamid', boxPlayers.getTeamPlayersFromTeamId);
router.get(`/previousgame/gameid/:season/:teamId/:gameid`, boxPlayers.getPreviousRosterBySeasonByTeamByGameId);
module.exports = router;