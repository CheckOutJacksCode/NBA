const express = require('express');
const router = express.Router();
const shots = require('../services/shotsQueries');

router.get('/', shots.getShots);

router.get('/:season', shots.getShotsBySeason);

router.get('/:player/:season', shots.getShotsByPlayerBySeasonLocal);

router.get('/local/shots/:season', shots.getShotsBySeasonLocal);

router.get('/local/shots/:player', shots.getShotsByPlayerLocal);

router.get('/:player/:season/:game_id', shots.getShotsByPlayerBySeasonByGameLocal);

router.post('/', shots.createShot);

router.post('/:season', shots.createShotBySeason);

module.exports = router;