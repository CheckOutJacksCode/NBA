const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const db = require('./queries');
const dotenv = require('dotenv').config();
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'The Hoop Scoop API',
            description: "NBA Statistics API",
            contact: {
                name: "Jack Petersen"
            },
            servers: ["http://localhost:3000"]
        }
    },
    apis: ["index.js", "./routes/boxRoutes.js", "./routes/boxScoreMiscRoutes.js",
            "./routes/boxScoreScoringRoutes.js", "./routes/boxScoresTraditionalRoutes.js",
            "./routes/boxScoreSummaryRoutes.js", "./routes/carmeloRoutes.js", "./routes/fourFactorsRoutes.js",
            "./routes/gamblingRoutes.js", "./routes/hustleStatsRoutes.js", "./routes/leagueDashLineupsRoutes.js",
            "./routes/leagueDashOppShotRoutes.js","./routes/leagueDashPlayerClutch.js",
            "./routes/leagueDashPlayerPtShotRoutes.js", "./routes/leagueGamesRoutes.js", "./routes/mvpPointsRoutes.js",
            "./routes/playersNBARoutes.js", "./routes/playerTrackerRoutes.js", "./routes/publicApiPlayersRoutes.js",
            "./routes/publicGamesRoutes", "./routes/regularSeasonStatsRoutes.js", "./routes/shotsRoutes.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocs)
);

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

const helmet = require('helmet')
app.use(helmet());
app.use(cookieParser());
app.use(csrf({ cookie: true }))


const boxRouter = require('./routes/boxRoutes');
const boxScoreMiscRouter = require('./routes/boxScoreMiscRoutes');
const boxScoreScoringRouter = require('./routes/boxScoreScoringRoutes');
const boxScoresTraditionalRouter = require('./routes/boxScoresTraditionalRoutes');
const boxScoreSummaryRouter = require('./routes/boxScoreSummaryRoutes');
const carmeloRouter = require('./routes/carmeloRoutes');
const fourFactorsRouter = require('./routes/fourFactorsRoutes');
const gamblingRouter = require('./routes/gamblingRoutes');
const hustleStatsRouter = require('./routes/hustleStatsRoutes');
const leagueDashLineupsRouter = require('./routes/leagueDashLineupsRoutes');
const leagueDashOppPtShotRouter = require('./routes/leagueDashOppShotRoutes');
const leagueDashPlayerClutchRouter = require('./routes/leagueDashPlayerClutchRoutes');
const leagueDashPlayerPtShotRouter = require('./routes/leagueDashPlayerPtShotRoutes');
const leagueGamesRouter = require('./routes/leagueGamesRoutes');
const mvpPointsRouter = require('./routes/mvpPointsRoutes');
const playersNBARouter = require('./routes/playersNBARoutes');
const playerTrackerRouter = require('./routes/playerTrackerRoutes');
const publicApiPlayersRouter = require('./routes/publicApiPlayersRoutes');
const publicGamesRouter = require('./routes/publicGamesRoutes');
const regularSeasonStatsRouter = require('./routes/regularSeasonStatsRoutes');
const shotsRouter = require('./routes/shotsRoutes');

app.use("/box", boxRouter);
app.use("/boxScoreMisc", boxScoreMiscRouter);
app.use("/boxScoreScoring", boxScoreScoringRouter);
app.use("/boxScoresTraditional", boxScoresTraditionalRouter);
app.use("/boxScoreSummary", boxScoreSummaryRouter);
app.use("/carmelo", carmeloRouter);
app.use("/fourFactors", fourFactorsRouter);
app.use("/gambling", gamblingRouter);
app.use("/hustleStats", hustleStatsRouter);
app.use("/leagueDashLineups", leagueDashLineupsRouter);
app.use("/leagueDashOppPtShot", leagueDashOppPtShotRouter);
app.use("/leagueDashPlayerClutch", leagueDashPlayerClutchRouter);
app.use("/leagueDashPlayerPtShot", leagueDashPlayerPtShotRouter);
app.use("/leagueGames", leagueGamesRouter);
app.use("/mvpPoints", mvpPointsRouter);
app.use("/playersNBA", playersNBARouter);
app.use("/playerTracker", playerTrackerRouter);
app.use("/publicApiPlayers", publicApiPlayersRouter);
app.use("/publicGames", publicGamesRouter);
app.use("/regularSeasonStats", regularSeasonStatsRouter);
app.use("/shots", shotsRouter);


app.get('/', (req, res, next) => {
    res.sendFile(__dirname + "/public/front.html");
});
/*
app.get('/', (req, res, next) => {
    res.sendFile(__dirname + "/public/scripts.js");
});
*/
app.get('/', (req, res, next) => {
    res.sendFile(__dirname + "/public/styles.css");
});
/*
app.get('/', (req, res, next) => {
    res.sendFile(__dirname + "/public/script2.js");
});
*/
app.get('/deepStats', (req, res, next) => {
    res.sendFile(__dirname + "/public/deepStats.html");
});

app.get('/shotCharts', (req, res, next) => {
    res.sendFile(__dirname + "/public/shotCharts.html");
});

app.get('/jackarithm', (req, res, next) => {
    res.sendFile(__dirname + "/public/jackarithm.html");
});


app.delete('/database/delete', db.deleteDatabase);


app.get(`/statsheaders/:table`, db.getStatsHeadersFromTable);

app.get('/teamnames', db.getTeamNames);



app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
module.exports = app;