const express = require('express');
const router = express.Router();
const gambling = require('../services/gamblingQueries');

/**
 * @swagger
 * components:
 *   schemas:
 *     OddsArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/OddsObject'
 *     OddsObject:
 *       type: 'object'
 *       properties:
 *         count:
 *           type: 'string'
 *       example:
 *         "Date\tRot\tVH\tTeam\t1st\t2nd\t3rd\t4th\tFinal\tOpen\tClose\tML\t2H": "1027\t501\tV\tCleveland\t17\t23\t28\t27\t95\t197.5\t198.5\t160\t97"
 * /gambling/odds/{season}:
 *   get:
 *     summary: Read Gambling Odds from CSV
 *     parameters:
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the odds we are reading
 *         example: '2015-2016'
 *     responses:
 *       '201':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OddsArray'
 *       '403':
 *         description: Not Authorized
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid Path
 */
router.get('/odds/:season', gambling.getOddsFromCSV);

/**
 * @swagger
 * /gambling/odds/{season}:
 *    post:
 *      summary: Creates a new season of odds in the database
 *      parameters:
 *        - in: path
 *          name: season
 *          schema:
 *            type: string
 *          required: true
 *          description: Odds season to post to
 *          example: '2015-2016'
 *      requestBody:
 *        description: Data for new odds
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/OddsObject'
 *      responses:
 *        '201':
 *          description: returns created odds
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/OddsObject'
 *        '403':
 *          description: Not Authorized
 *        '400':
 *          description: Bad Request
 *        '404':
 *          description: Invalid Path
 */
router.post('/odds/:season', gambling.createOddsBySeason);

router.get(`/moneyline/home/:season/:homeTeam/:gamedate`, gambling.getHomeMoneyline);

router.get(`/moneyline/visitor/:season/:visitorTeam/:gamedate`, gambling.getVisitorMoneyline);

module.exports = router;