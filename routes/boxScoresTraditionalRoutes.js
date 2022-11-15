const express = require('express');
const router = express.Router();
const boxScoreTraditional = require('../services/boxscorestraditionalQueries')

/**
 * @swagger
 * definitions:
 *   BoxScoreTraditionalArray:
 *     type: 'array'
 *     items:
 *       $ref: '#definitions/BoxScoreTraditionalObject'
 *   BoxScoreTraditionalObject:
 *     type: 'object'
 *     properties:
 *       id:
 *         type: 'integer'
 *       game_id:
 *         type: 'string'
 *       team_id:
 *         type: 'string'
 *       team_abbreviation:
 *         type: 'string'
 *       team_city:
 *         type: 'string'
 *       player_id:
 *         type: 'string'
 *       player_name:
 *         type: 'string'
 *       nickname:
 *         type: 'string'
 *       start_position:
 *         type: 'string'
 *       comment:
 *         type: 'string'
 *       min:
 *         type: 'string'
 *       fgm:
 *         type: 'string'
 *       fga:
 *         type: 'string'
 *       fg_pct:
 *         type: 'string'
 *       fg3m:
 *         type: 'string'
 *       fg3a:
 *         type: 'string'
 *       fg3_pct:
 *         type: 'string'
 *       ftm:
 *         type: 'string'
 *       fta:
 *         type: 'string'
 *       ft_pct:
 *         type: 'string'
 *       oreb:
 *         type: 'string'
 *       dreb:
 *         type: 'string'
 *       reb:
 *         type: 'string'
 *       ast:
 *         type: 'string'
 *       stl:
 *         type: 'string'
 *       blk:
 *         type: 'string'
 *       turnovers:
 *         type: 'string'
 *       pf:
 *         type: 'string'
 *       pts:
 *         type: 'string'
 *       plus_minus:
 *         type: 'string'
 *       game_date_est:
 *         type: 'string'
 *       game_sequence:
 *         type: 'string'
 *       game_status_id:
 *         type: 'string'
 *       game_status_text:
 *         type: 'string'
 *       gamecode:
 *         type: 'string'
 *       home_team_id:
 *         type: 'string'
 *       visitor_team_id:
 *         type: 'string'
 *       season:
 *         type: 'string'
 *       live_period:
 *         type: 'string'
 *       live_pc_time:
 *         type: 'string'
 *       natl_tv_broadcaster_abbreviation:
 *         type: 'string'
 *       live_period_time_bcast:
 *         type: 'string'
 *       wh_status:
 *         type: 'string'
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/BoxScoreTraditionalArray'
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid Path
 */
router.get('/home/:playerid/:season', boxScoreTraditional.getBoxScoreTraditionalHome);

/** 
* @swagger
* /boxScoresTraditional/visitor/{playerid}/{season}:
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
*         content:
*           application/json:
*             schema:
*               $ref: '#/definitions/BoxScoreTraditionalArray'
*       '400':
*         description: Bad Request
*       '404':
*         description: Invalid Path
*/
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