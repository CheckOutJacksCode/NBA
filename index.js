const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const db = require('./queries');

const port = process.env.PORT || 3000;
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);



app.get('/', (req, res, next) => {
    res.sendFile(__dirname + "/public/front.html");
});
app.get('/', (req, res, next) => {
    res.sendFile(__dirname + "/public/scripts.js");
});
app.get('/', (req, res, next) => {
    res.sendFile(__dirname + "/public/styles.css");
});
app.get('/', (req, res, next) => {
    res.sendFile(__dirname + "/public/script2.js");
});

app.get('/deepStats', (req, res, next) => {
    res.sendFile(__dirname + "/public/deepStats.html");
});

app.get('/shotCharts', (req, res, next) => {
    res.sendFile(__dirname + "/public/shotCharts.html");
});

app.get('/leaguegames/:season', db.getGamesBySeason);

app.post('/leaguegames/:season', db.createGamesBySeason);

app.post('/players', db.createPlayer);

app.get('/players', db.getPlayers);

app.get('/playerIds', db.getPlayerIds);

app.post('/playersNBA', db.createPlayersNBA);

app.get('/playersNBA', db.getPlayersNBA);

app.get('/games/:playerid/:league/:seasonyear', db.getPlayerSeasonGameStats);

app.get('/shots', db.getShots);

app.get('/shots/:season', db.getShotsBySeason);

app.get('/local/shots/:season', db.getShotsBySeasonLocal);

app.get('/local/shots/:player', db.getShotsByPlayerLocal);

app.get('/local/shots/:player/:season', db.getShotsByPlayerBySeasonLocal);

app.get('/local/shots/:player/:season/:game', db.getShotsByPlayerBySeasonByGameLocal);

app.post('/shot', db.createShot);

app.post('/shot/:season', db.createShotBySeason);

app.post('/mvpPoints', db.createPlayerMvpPoints);

app.post('/carmeloPoints', db.createPlayerCarmeloPoints);

app.post('/hustlePoints', db.createPlayerHustlePoints);

app.get('/getLocalMvpPointsInSeason/:season', db.getAllFirstLastMvpPointsInSeason);

app.get('/getLocalCarmeloPointsInSeason/:season', db.getAllFirstLastCarmeloPointsInSeason);

app.get('/getLocalHustlePointsInSeason/:season', db.getAllFirstLastHustlePointsInSeason)

app.post('/games', db.createGame);

app.post('/games/seasonyear/:seasonyear', db.createGameInfo);

app.delete('/database/delete', db.deleteDatabase);

app.get('/local/players/:lastName/:firstName', db.getPlayersWithLastFirst);

app.get('/local/players/playerid/:lastName/:firstName', db.getPlayerIdWithLastFirst);

app.get('/local/players/:playerid', db.getPlayerById)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
module.exports = app;