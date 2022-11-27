const express = require('express');
const cors = require('cors');
require('dotenv').config()
const session = require('express-session');
const passport = require('passport');
const flash = require('express-flash');
const initializePassport = require('./config/passport');
initializePassport(passport);

const app = express();
const bodyParser = require('body-parser')
const db = require('./queries');
//const dotenv = require('dotenv').config();
//const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const { sequelize } = require('./models');
/*app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "script-src 'self' http://d3js.org");
    return next();
});*/
const { errorLogger, errorResponder, invalidPathHandler } = require(`./middleware/errorMiddleware`);

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'The Hoop Scoop API',
            description: "NBA Statistics API",
            contact: {
                name: "Jack Petersen"
            },
            servers: ["http://localhost:3000"]
        }
    },
    apis: ["index.js", "./routes/boxPlayersRoutes.js", "./routes/boxRoutes.js", "./routes/boxScoreMiscRoutes.js",
            "./routes/boxScoreScoringRoutes.js", "./routes/boxScoresTraditionalRoutes.js",
            "./routes/boxScoreSummaryRoutes.js", "./routes/carmeloRoutes.js", "./routes/fourFactorsRoutes.js",
            "./routes/gamblingRoutes.js", "./routes/hustleStatsRoutes.js", "./routes/leagueDashLineupsRoutes.js",
            "./routes/leagueDashOppShotRoutes.js","./routes/leagueDashPlayerClutchRoutes.js",
            "./routes/leagueDashPlayerPtShotRoutes.js", "./routes/leagueGamesRoutes.js", "./routes/mvpPointsRoutes.js",
            "./routes/playersNBARoutes.js", "./routes/playerTrackerRoutes.js", "./routes/publicApiPlayersRoutes.js",
            "./routes/publicGamesRoutes", "./routes/regularSeasonStatsRoutes.js", "./routes/shotsRoutes.js", "./models/user.js",
            "./routes/userRouter.js", "./routes/statRankedRouter.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
//app.use(cors());
app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocs)
);

app.use(flash());


app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static('public'))

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.set('view engine', 'ejs');

const helmet = require('helmet')
app.use(
    helmet.contentSecurityPolicy({
      directives: {
        "script-src": ["'self'", "https://d3js.org/d3.v6.min.js"],
      },
    })
  );
//app.use(cookieParser());

const boxPlayersRouter = require('./routes/boxPlayersRoutes');
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
const userRouter = require("./routes/userRouter");
const statRankedRouter = require("./routes/statRankedRoutes");

app.use("/boxPlayers", boxPlayersRouter)
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
app.use("/users", userRouter.router);
app.use("/statranked", statRankedRouter)


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

app.use(errorLogger);
app.use(errorResponder);
app.use(invalidPathHandler);

/*async function main() {
    await sequelize.sync();
}
main();*/

app.listen(port, async() => {
    await sequelize.authenticate();
    console.log(`App running on port ${port}.`)
})
module.exports = app;