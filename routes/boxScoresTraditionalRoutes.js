const express = require('express');
const router = express.Router();
const boxScoreTraditional = require('../services/boxscorestraditionalQueries');
const { checkAuthenticated } = require('./userRouter');
/**
 * @swagger
 * components:
 *   schemas:
 *     BoxScoreTraditionalArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/BoxScoreTraditionalObject'
 *     BoxScoreTraditionalObject:
 *       type: 'object'
 *       properties:
 *         GAME_ID:
 *           type: 'string'
 *         TEAM_ID:
 *           type: 'string'
 *         TEAM_ABBREVIATION:
 *           type: 'string'
 *         TEAM_CITY:
 *           type: 'string'
 *         PLAYER_ID:
 *           type: 'string'
 *         PLAYER_NAME:
 *           type: 'string'
 *         NICKNAME:
 *           type: 'string'
 *         START_POSITION:
 *           type: 'string'
 *         COMMENT:
 *           type: 'string'
 *         MIN:
 *           type: 'string'
 *         FGM:
 *           type: 'string'
 *         FGA:
 *           type: 'string'
 *         FG_PCT:
 *           type: 'string'
 *         FG3M:
 *           type: 'string'
 *         FG3A:
 *           type: 'string'
 *         FG3_PCT:
 *           type: 'string'
 *         FTM:
 *           type: 'string'
 *         FTA:
 *           type: 'string'
 *         FT_PCT:
 *           type: 'string'
 *         OREB:
 *           type: 'string'
 *         DREB:
 *           type: 'string'
 *         REB:
 *           type: 'string'
 *         AST:
 *           type: 'string'
 *         STL:
 *           type: 'string'
 *         BLK:
 *           type: 'string'
 *         TO:
 *           type: 'string'
 *         PF:
 *           type: 'string'
 *         PTS:
 *           type: 'string'
 *         PLUS_MINUS:
 *           type: 'string'
 *       example:
 *         GAME_ID: '1'
 *         TEAM_ID: '1'
 *         TEAM_ABBREVIATION: BOS
 *         TEAM_CITY: Boston
 *         PLAYER_ID: '1'
 *         PLAYER_NAME: Buck Dancer
 *         NICKNAME: Buck
 *         START_POSITION: F
 *         COMMENT: something about player health usually
 *         MIN: 30:00
 *         FGM: '5'
 *         FGA: '10'
 *         FG_PCT: '0.5'
 *         FG3M: '2'
 *         FG3A: '4'
 *         FG3_PCT: '0.5'
 *         FTM: '2'
 *         FTA: '2'
 *         FT_PCT: '1.0'
 *         OREB: '1'
 *         DREB: '1'
 *         REB: '2'
 *         AST: '1'
 *         STL: '1'
 *         BLK: '1'
 *         TO: '1'
 *         PF: '1'
 *         PTS: '12'
 *         PLUS_MINUS: '5'
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
 *               $ref: '#/components/schemas/BoxScoreTraditionalObject'
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
*               $ref: '#/components/schemas/BoxScoreTraditionalObject'
*       '400':
*         description: Bad Request
*       '404':
*         description: Invalid Path
*/
router.get('/visitor/:playerid/:season', boxScoreTraditional.getBoxScoreTraditionalVisitor);


/**
 * @swagger
 * /boxScoresTraditional/{season}:
 *    post:
 *      summary: Creates a new Box Score Traditional
 *      parameters:
 *        - in: path
 *          name: season
 *          schema:
 *            type: string
 *          required: true
 *          description: Box Score Traditional season to post to
 *      requestBody:
 *        description: Data for new Box Score Traditional
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoxScoreTraditionalObject'
 *      responses:
 *        '201':
 *          description: returns created box score traditional
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/BoxScoreTraditionalObject'
 *        '403':
 *          description: Not Authorized
 *        '400':
 *          description: Bad Request
 *        '404':
 *          description: Invalid Path
 */
router.post('/:season', checkAuthenticated, boxScoreTraditional.createBoxScoresTraditional);

/** 
* @swagger
* /boxScoresTraditional/read/{season}:
*   get:
*     parameters:
*       - in: path
*         name: season
*         schema:
*           type: string
*         required: true
*         description: String season of the box scores we are reading
*     responses:
*       '201':
*         description: A successful response
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/BoxScoreTraditionalArray'
*       '403':
*         description: Not Authorized
*       '400':
*         description: Bad Request
*       '404':
*         description: Invalid Path
*/
router.get('/read/:season', checkAuthenticated, boxScoreTraditional.boxScoreTraditionalLoad);

/** 
* @swagger
* /boxScoresTraditional/{playerid}/{season}:
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
*               $ref: '#/components/schemas/BoxScoreTraditionalArray'
*       '400':
*         description: Bad Request
*       '404':
*         description: Invalid Path
*/
router.get(`/:playerid/:season`, boxScoreTraditional.getBoxScorePlayer);

/** 
* @swagger
* /boxScoresTraditional/{season}/{gameid}/{playerid}:
*   get:
*     parameters:
*       - in: path
*         name: season
*         schema:
*           type: string
*         required: true
*         description: String season of the box scores we are getting
*       - in: path
*         name: gameid
*         schema:
*           type: string
*         required: true
*         description: String ID of the game we are getting
*       - in: path
*         name: playerid
*         schema:
*           type: string
*         required: true
*         description: String ID of the player who's box scores we are getting
*     responses:
*       '200':
*         description: A successful response
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/BoxScoreTraditionalArray'
*       '400':
*         description: Bad Request
*       '404':
*         description: Invalid Path
*/
router.get('/:season/:gameid/:playerid', boxScoreTraditional.getBoxScoresTraditional);

router.get(`/boxnum/:gameid/:season/:teamid/:H_or_V`, boxScoreTraditional.getBoxNumFromGameIdSeason)

router.get(`/jackarithm/home/:playerid/:season`, boxScoreTraditional.getBoxScoreTraditionalHome);

router.get(`/jackarithm/visitor/:playerid/:season`, boxScoreTraditional.getBoxScoreTraditionalVisitor);

router.get(`/previousgame/gameid/:season/:teamId`, boxScoreTraditional.getPreviousGameIdBySeasonByTeam);

module.exports = router;