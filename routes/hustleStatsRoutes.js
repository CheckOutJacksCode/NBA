const express = require('express');
const router = express.Router();
const hustleStats = require('../services/hustleStatsQueries');
const { checkAuthenticated } = require('./userRouter');


/**
 * @swagger
 * components:
 *   schemas:
 *     PlayersNBAArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/PlayersNBAObject'
 *     PlayersNBAObject:
 *       type: 'object'
 *       properties:
 *         full_name:
 *           type: 'string'
 *         first_name:
 *           type: 'string'
 *         last_name:
 *           type: 'string'
 *         is_active:
 *           type: 'string'
 *         playerid:
 *           type: 'string'
 *       example:
 *         full_name: "Draymond Green"
 *         first_name: "Draymond"
 *         last_name: "Green"
 *         is_active: "true"
 *         playerid: "203110"
 *     HustleArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/HustleObject'
 *     HustleObject:
 *       type: 'object'
 *       properties:
 *         player:
 *           type: 'object'
 *           items:
 *             $ref: '#/components/schemas/PlayersNBAArray'
 *         hustlePts:
 *           type: 'string'
 *         season:
 *           type: 'string'
 *       example:
 *         player: [{"full_name": "Draymond Green", "first_name": "Draymond", "last_name": "Green", "is_active": "true", "playerid": "203110"}]
 *         hustlePts: '3.81'
 *         season: '2015-2016'
 *     LeagueHustleArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/LeagueHustleObject'
 *     LeagueHustleObject:
 *       type: 'object'
 *       properties:
 *         player:
 *           type:
 *         hustlePts:
 *           type: 'string'
 *         season:
 *           type: 'string'
 *       example:
 *         PLAYER_ID
 *         PLAYER_NAME
 *         TEAM_ID
 *         TEAM_ABBREVIATION
 *         AGE
 *         G
 *         MIN
 *         CONTESTED_SHOTS
 *         CONTESTED_SHOTS_2PT
 *         CONTESTED_SHOTS_3PT
 *         DEFLECTIONS
 *         CHARGES_DRAWN
 *         SCREEN_ASSISTS
 *         SCREEN_AST_PTS
 *         OFF_LOOSE_BALLS_RECOVERED
 *         DEF_LOOSE_BALLS_RECOVERED
 *         LOOSE_BALLS_RECOVERED
 *         PCT_LOOSE_BALLS_RECOVERED_OFF
 *         PCT_LOOSE_BALLS_RECOVERED_DEF
 *         OFF_BOXOUTS
 *         DEF_BOXOUTS
 *         BOX_OUT_PLAYER_TEAM_REBS
 *         BOX_OUT_PLAYER_REBS
 *         BOX_OUTS
 *         PCT_BOX_OUTS_OFF
 *         PCT_BOX_OUTS_DEF
 *         PCT_BOX_OUTS_TEAM_REB
 *         PCT_BOX_OUTS_REB
 * /hustleStats:
 *    post:
 *      summary: Creates a new hustle stats player row in database
 *      requestBody:
 *        description: Data for new hustle stats player
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/HustleObject'
 *      responses:
 *        '201':
 *          description: returns created hustleObject
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/HustleObject'
 *        '403':
 *          description: Not Authorized
 *        '400':
 *          description: Bad Request
 *        '404':
 *          description: Invalid Path
 */
router.post('/', hustleStats.createPlayerHustlePoints);

router.get('/getLocalHustlePointsInSeason/:season', hustleStats.getAllFirstLastHustlePointsInSeason);

/**
 * @swagger
 * /hustleStats/{season}:
 *    post:
 *      summary: Creates a new league hustle stats player row in database
 *      requestBody:
 *        description: Data for new league hustle stats player
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeagueHustleObject'
 *      responses:
 *        '201':
 *          description: returns created league hustleObject
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/LeagueHustleObject'
 *        '403':
 *          description: Not Authorized
 *        '400':
 *          description: Bad Request
 *        '404':
 *          description: Invalid Path
 */
router.post('/:season', hustleStats.createLeagueHustleStatsBySeason);

/**
 * @swagger
 * /boxScoreSummary/read/{season}:
 *   get:
 *     summary: Read Box Scores Summary from CSV
 *     parameters:
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the box scores summary we are reading
 *         example: '2015-2016'
 *     responses:
 *       '201':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoxScoreSummaryArray'
 *       '403':
 *         description: Not Authorized
 */
router.get('/leaguehustlestats/:season', hustleStats.getLeagueHustleStatsBySeason);

module.exports = router;
