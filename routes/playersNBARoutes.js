const express = require('express');
const router = express.Router();
const playersNBA = require('../services/playersNBAQueries');

router.post('/', playersNBA.createPlayersNBA);
router.get('/', playersNBA.getPlayersNBA);
router.get('/official/players/playerid/:lastName/:firstName', playersNBA.getOfficialPlayerIdWithLastFirst);
router.get('/playerNBA/:playerid', playersNBA.getPlayerByIdOfficial);

module.exports = router;

