const express = require('express');
const router = express.Router();
const leagueGames = require('../services/leagueGamesQueries');

router.get('/:season', leagueGames.getGamesBySeason);
router.get('/local/leaguegames', leagueGames.getGamesLocal);

router.get('/local/leaguegames/:season', leagueGames.getGamesBySeasonLocal);

router.post('/:season', leagueGames.createGamesBySeason);
router.get('/gameidgamedatematchup/:player/:season', leagueGames.getGameIdGameDateMatchupBySeasonDropDownLocal);

router.get('/teamid/:teamname', leagueGames.getTeamIdFromName);

router.get('/gameResults/home/:team/:season', leagueGames.getGameResultsByHomeTeamSeason);

router.get('/gameResults/visitor/:team/:season', leagueGames.getGameResultsByVisitorTeamSeason);
router.get(`/actual/gameresult/:matchup1/:season`, leagueGames.getActualGameResultsByMatchupBySeason);

router.get(`/teamabbreviation/:team_name`, leagueGames.getAbbreviationFromTeamName);
router.get(`/testing/previousgame/gameid/:season/:teamId/:gamedate`, leagueGames.getPreviousGameIdBySeasonByTeamByGameDate);

module.exports = router;
