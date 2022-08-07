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
})
app.post('/players', db.createPlayer);

app.get('/players', db.getPlayers);

app.post('/playersNBA', db.createPlayersNBA);

app.get('/playersNBA', db.getPlayersNBA);

app.get('/games/:playerid/:league/:seasonyear', db.getPlayerSeasonGameStats);

app.get('/shots', db.getShots);

app.post('/shot', db.createShot);

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