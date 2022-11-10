const express = require('express');
const router = express.Router();
const boxScoreTraditional = require('../services/boxscorestraditionalQueries')

/**
 * @swagger 
 * /boxScoresTraditional/home/{playerid}/{season}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: playerid
 *         schema:
 *           type: string
 *         required: true
 *         description: String ID of the player who's box scores we are getting
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the box scores we are getting
 *     responses:
 *       '200':
 *         description: A successful response
 *       
 */
router.get('/home/:playerid/:season', boxScoreTraditional.getBoxScoreTraditionalHome);

router.get('/visitor/:playerid/:season', boxScoreTraditional.getBoxScoreTraditionalVisitor);

router.post('/:season', boxScoreTraditional.createBoxScoresTraditional);

router.get('/read/:season', boxScoreTraditional.boxScoreTraditionalLoad);

router.get(`/:playerid/:season`, boxScoreTraditional.getBoxScorePlayer);

router.get('/:season/:gameid/:playerid', boxScoreTraditional.getBoxScoresTraditional);

router.get(`/boxnum/:gameid/:season/:teamid/:H_or_V`, boxScoreTraditional.getBoxNumFromGameIdSeason)

router.get(`/jackarithm/home/:playerid/:season`, boxScoreTraditional.getBoxScoreTraditionalHome);

router.get(`/jackarithm/visitor/:playerid/:season`, boxScoreTraditional.getBoxScoreTraditionalVisitor);

router.get(`/previousgame/gameid/:season/:teamId`, boxScoreTraditional.getPreviousGameIdBySeasonByTeam);

module.exports = router;