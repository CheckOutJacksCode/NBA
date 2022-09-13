const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const db = require('./queries');
require('dotenv').config();


const port = 3000;
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

app.get('/leaguehustlestats/:season', db.getLeagueHustleStatsBySeason);

app.get('/local/leaguegames', db.getGamesLocal);

app.get('/local/leaguegames/:season', db.getGamesBySeasonLocal);

app.post('/leaguegames/:season', db.createGamesBySeason);

app.post('/players', db.createPlayer);

app.post('/playerscloud', db.createPlayerCloud);

app.get('/players', db.getPlayers);

app.get('/playerIds', db.getPlayerIds);

app.get('/playersJson', db.getPlayersJson);

app.post('/playersNBA', db.createPlayersNBA);

app.get('/playersNBA', db.getPlayersNBA);

app.get('/games/:playerid/:league/:seasonyear', db.getPlayerSeasonGameStats);

app.get('/shots', db.getShots);

app.get('/shots/:season', db.getShotsBySeason);

app.get('/local/shots/:season', db.getShotsBySeasonLocal);

app.get('/local/shots/:player', db.getShotsByPlayerLocal);

app.get('/local/shots/:player/:season', db.getShotsByPlayerBySeasonLocal);

app.get('/local/shots/:player/:season/:game_id', db.getShotsByPlayerBySeasonByGameLocal);

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

app.get('/official/players/playerid/:lastName/:firstName', db.getOfficialPlayerIdWithLastFirst);

app.get('/local/players/:playerid', db.getPlayerById);

app.get('/local/gameidgamedatematchup/:player/:season', db.getGameIdGameDateMatchupBySeasonDropDownLocal);

app.get('/games/:playerid', db.getGamesByPlayer);

app.get('/games/vteamhteam/:playerid', db.getVTeamHTeam);

app.get('/games/:gameid/:playerid', db.getLocalGamesByGameByPlayerPublic);

app.get('/games/gameid/:playerid/:league/:seasonyear/:shotsgameid', db.getGameIdPublic);

app.post('/boxscores/:season', db.createBoxScores);

app.get('/boxscores/read/:season', db.boxScoreLoad);

app.post('/boxscorestraditional/:season', db.createBoxScoresTraditional);

app.get('/boxscorestraditional/read/:season', db.boxScoreTraditionalLoad);

app.get('/gameinfo/:gameid', db.getGameInfoByGameId);

app.post('/leaguehustlestats/:season', db.createLeagueHustleStatsBySeason)

app.get('/gamescloud', db.getGamesFromJson);

app.post('/gamescloud', db.createGameCloud);

app.get('/gameinfocloud', db.getGameInfoFromJson);

app.post('/gameinfocloud', db.createGameInfoCloud);

app.get('/boxscorestraditional/:season/:gameid/:playerid', db.getBoxScoresTraditional);


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
module.exports = app;