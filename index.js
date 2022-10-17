const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const db = require('./queries');
require('dotenv').config();


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

app.get('/jackarithm', (req, res, next) => {
    res.sendFile(__dirname + "/public/jackarithm.html");
});

app.get(`/getAllMvpPoints/:season`, db.getAllMvpPointsFunction)


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

app.get('/officialboxscores/home/:playerid/:season', db.getBoxScoreTraditionalHome);

app.get('/officialboxscores/visitor/:playerid/:season', db.getBoxScoreTraditionalVisitor);

app.get('/shots', db.getShots);

app.get('/shots/:season', db.getShotsBySeason);

app.get('/local/shots/:player/:season', db.getShotsByPlayerBySeasonLocal);

app.get('/local/shots/:season', db.getShotsBySeasonLocal);

app.get('/local/shots/:player', db.getShotsByPlayerLocal);

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

app.get('/playeridlist/:season', db.getOfficialPlayerIdList);

app.get('/playernameidlist/:season', db.getOfficialPlayerIdNameList);

app.get('/playerNBA/:playerid', db.getPlayerByIdOfficial);

app.get('/teamnames', db.getTeamNames);

app.get('/teamid/:teamname', db.getTeamIdFromName);

app.get('/teamplayers/:teamid', db.getTeamPlayersFromTeamId);

app.get('/seasonregularplayerstats', db.seasonRegularPlayerStatsLoad);

app.post(`/seasonregularplayerstats`, db.createSeasonRegularPlayerStatsTotals);

app.get('/getregularseasonstatlines/:playerid', db.getRegularSeasonStatLines);

app.get('/getregularseasonstatlines/:season/:playerid', db.getRegularSeasonStatLinesBySeason);

app.get('/shotseasons/:playerid', db.getShotSeasonsFromPlayerId);

app.get('/read/boxscorefourfactors/:season', db.getBoxScoreFourFactorsFromCSV);

app.post(`/boxscorefourfactors/:season`, db.createBoxScoreFourFactors);

app.get('/read/boxscorefourfactorsteams/:season', db.getBoxScoreFourFactorsTeamsFromCSV);

app.post(`/boxscorefourfactorsteams/:season`, db.createBoxScoreFourFactorsTeams);

app.get('/read/boxscoremisc/:season', db.getBoxScoreMiscFromCSV);

app.post(`/boxscoremisc/:season`, db.createBoxScoreMisc);

app.get('/read/boxscoremiscteams/:season', db.getBoxScoreMiscTeamsFromCSV);

app.post(`/boxscoremiscteams/:season`, db.createBoxScoreMiscTeams);

app.get('/read/boxscoreplayertracker/:season', db.getBoxScorePlayerTrackerFromCSV);

app.post(`/boxscoreplayertracker/:season`, db.createBoxScorePlayerTracker);

app.get('/read/boxscoreplayertrackerteams/:season', db.getBoxScorePlayerTrackerTeamsFromCSV);

app.post(`/boxscoreplayertrackerteams/:season`, db.createBoxScorePlayerTrackerTeams);

app.get('/read/leaguedashlineups/:season', db.getLeagueDashLineupsFromJson);

app.post(`/leaguedashlineups/:season`, db.createLeagueDashLineups);

app.get('/read/leaguedashoppptshot/:season', db.getLeagueDashOppPtShotFromJson);

app.post(`/leaguedashoppptshot/:season`, db.createLeagueDashOppPtShot);

app.get('/read/leaguedashplayerclutch/:season', db.getLeagueDashPlayerClutchFromJson);

app.post(`/leaguedashplayerclutch/:season`, db.createLeagueDashPlayerClutch);

app.get('/read/leaguedashplayerptshot/:season', db.getLeagueDashPlayerPtShotFromJson);

app.post(`/leaguedashplayerptshot/:season`, db.createLeagueDashPlayerPtShot);

app.get('/read/leaguedashplayershotlocations/:season', db.getLeagueDashPlayerShotLocationsFromJson);

app.post(`/leaguedashplayershotlocations/:season`, db.createLeagueDashPlayerShotLocations);

app.get('/read/boxscorescoring/:season', db.getBoxScoreScoringFromCSV);

app.post(`/boxscorescoring/:season`, db.createBoxScoreScoring);

app.get('/read/boxscorescoringteams/:season', db.getBoxScoreScoringTeamsFromCSV);

app.post(`/boxscorescoringteams/:season`, db.createBoxScoreScoringTeams);

app.get('/read/boxscoresummary/:season', db.getBoxScoreSummaryFromCSV);

app.post(`/boxscoresummary/:season`, db.createBoxScoreSummary);

app.get(`/getroster/:season/:team`, db.getRosterBySeasonByTeam);

app.get(`/jackarithm/boxscorestraditional/:playerid/:season`, db.getBoxScoreTraditionalStats);

app.get(`/boxnum/:gameid/:season/:teamid/:H_or_V`, db.getBoxNumFromGameIdSeason)

app.get('/jackarithm/gameResults/home/:team/:season', db.getGameResultsByHomeTeamSeason);

app.get('/jackarithm/gameResults/visitor/:team/:season', db.getGameResultsByVisitorTeamSeason);

app.get(`/boxscoresummary/:season`, db.createBoxScoreSummary);

app.get(`/statsheaders/:table`, db.getStatsHeadersFromTable);

app.get(`/home/gameids/:season/:team_id`, db.getVisitorGameIdsBySeason);

app.get(`/visitor/gameids/:season/:team_id`, db.getVisitorGameIdsBySeason);

app.get(`/jackarithm/home/boxscorestraditional/:playerid/:season`, db.getBoxScoreTraditionalHome);

app.get(`/jackarithm/visitor/boxscorestraditional/:playerid/:season`, db.getBoxScoreTraditionalVisitor);

app.get(`/actual/gameresult/:matchup1/:season`, db.getActualGameResultsByMatchupBySeason);

app.get(`/teamabbreviation/:team_name`, db.getAbbreviationFromTeamName);

app.get('/odds/:season', db.getOddsFromCSV);

app.post('/odds/:season', db.createOddsBySeason);

app.get(`/moneyline/home/:season/:homeTeam/:gamedate`, db.getHomeMoneyline)

app.get(`/moneyline/visitor/:season/:visitorTeam/:gamedate`, db.getVisitorMoneyline)

app.get(`/previousgame/gameid/:season/:teamId`, db.getPreviousGameIdBySeasonByTeam);

app.get(`/previousgame/gameid/:season/:teamId/:gameid`, db.getPreviousRosterBySeasonByTeamByGameId);

app.get(`/testing/previousgame/gameid/:season/:teamId/:gamedate`, db.getPreviousGameIdBySeasonByTeamByGameDate);

app.get(`/lengthofseason/:season/:teamid/:H_or_V`, db.getLengthOfSeason);

app.get(`/jackarithm/mvpPoints/:playerid/:season/:H_or_V`, db.getMVPPointsByPlayerBySeason);

app.get(`/fourfactorsboxscores/home/:playerid/:season`, db.getBoxScoreFourFactorsVisitor)

app.get(`/fourfactorsboxscores/visitor/:playerid/:season`, db.getBoxScoreFourFactorsHome)


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
module.exports = app;