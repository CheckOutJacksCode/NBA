import axios from "axios";
import '../App.css';
import React, { useEffect, useState } from "react";
import ShotChartSVG from "./ShotChartSVG";
import ShotChartGameSVG from "./ShotChartGameSVG";
import GetRosterFromPreviousGame from "./GetRosterFromPreviousGame";
import ActualResults from "./ActualResults";
import Odds from "./Odds";

const ExpectedResults = ({ homeExpectedResults, 
                           setHomeExpectedResults, 
                           visitorExpectedResults, 
                           setVisitorExpectedResults, 
                           game, 
                           selectedSeason, 
                           setSelectedSeason }) => {

    const [homeTeamId, setHomeTeamId] = useState('');
    const [visitorTeamId, setVisitorTeamId] = useState('');
    const [homeRoster, setHomeRoster] = useState([]);
    const [visitorRoster, setVisitorRoster] = useState([]);
    const [gameDate, setGameDate] = useState('');
    const [teamId, setTeamId] = useState('');
    const [homePreviousGameId, setHomePreviousGameId] = useState('');
    const [visitorPreviousGameId, setVisitorPreviousGameId] = useState('');
    const [H_or_V, setH_or_V] = useState('');
    const [matchup, setMatchup] = useState('');
    
    const [averageScore, setAverageScore] = useState(0);
    const [previousSeason, setPreviousSeason] = useState('');

    useEffect(() => {
        const getPreviousSeason = async() => {
            let split = selectedSeason.split('-')
            let previous = parseInt(split[1]) - 1;
            let previous2 = parseInt(split[0]) - 1;
            let thisSeason = previous2 + '-' + previous;
            setPreviousSeason(thisSeason);
        }
        if (selectedSeason) {
            getPreviousSeason();
        }
    }, [selectedSeason])


    useEffect(() => {
        const getAverageScore = async() => {
            if (homePreviousGameId !== '1') {
                let results = await axios.get(`/leagueGames/averageScore/${homePreviousGameId}/${selectedSeason}`);
                console.log(results.data[0])
                setAverageScore(results.data[0].avg);
                console.log(averageScore)
            } else {
                let results = await axios.get(`/leagueGames/averageScore/${previousSeason}`);
                setAverageScore(results.data[0].avg);
                console.log(results.data[0])
                console.log(averageScore)
            }
        }
        if (homePreviousGameId && previousSeason) {
            getAverageScore();
        }
    }, [game, homePreviousGameId, previousSeason])

    useEffect(() => {
        const getPreviousGameIds = async() => {
            console.log(game.game_id)
            console.log(selectedSeason)
            if (game.game_id === 'upcoming') {
                let homePrevious = await axios.get(`/boxScoresTraditional/previousgame/gameid/${selectedSeason}/${homeTeamId}`)
                console.log(homePrevious.data);
                if (homePrevious.data.length > 0) {
                    setHomePreviousGameId(homePrevious.data[0].game_id)
                } else {
                    setHomePreviousGameId('1')
                }
            } else {
                
                let homePrevious = await axios.get(`/boxScoresTraditional/previousgameid/${game.game_id}/${selectedSeason}/${homeTeamId}`)
                console.log(homePrevious.data);
                if (homePrevious.data.length > 0) {
                    setHomePreviousGameId(homePrevious.data[0].game_id)
                } else {
                    setHomePreviousGameId('1')
                }
            }
            if (game.game_id === 'upcoming') {
                let visitorPrevious = await axios.get(`/boxScoresTraditional/previousgame/gameid/${selectedSeason}/${visitorTeamId}`)
                if (visitorPrevious.data.length > 0) {
                    setVisitorPreviousGameId(visitorPrevious.data[0].game_id)
                } else {
                    setVisitorPreviousGameId('1')
                }
            } else {
                let visitorPrevious = await axios.get(`/boxScoresTraditional/previousgameid/${game.game_id}/${selectedSeason}/${visitorTeamId}`)
                if (visitorPrevious.data.length > 0) {
                    setVisitorPreviousGameId(visitorPrevious.data[0].game_id)
                } else {
                    setVisitorPreviousGameId('1')
                }
            }
        } 
        if (homeTeamId && visitorTeamId) {
            getPreviousGameIds();
        }
    }, [game, homeTeamId, visitorTeamId, selectedSeason])

    useEffect(() => {
        const getTeamIds = async() => {
            if (game.game_id === 'upcoming') {
                console.log(game);
                let results = await axios.get(`/leagueGames/teamid/${game.home_team}`)
                console.log(results.data);
                setHomeTeamId(results.data[0].team_id)
                let results2 = await axios.get(`/leagueGames/teamid/${game.away_team}`)
                console.log(results2.data);
                setVisitorTeamId(results2.data[0].team_id)
                setGameDate(game.commence_time.substring(0, 10));
                let results3 = await axios.get(`/leagueGames/teamabbreviation/${game.home_team}`)
                console.log(results3.data)
                let results4 = await axios.get(`/leagueGames/teamabbreviation/${game.away_team}`)
                console.log(results4.data)
                setMatchup(results3.data[0].team_abbreviation + ' vs. ' + results4.data[0].team_abbreviation)
            } else {
                setHomeTeamId(game.home_team_id);
                setVisitorTeamId(game.visitor_team_id);
                setGameDate(game.game_date);
                setMatchup(game.matchup)
                /*setActualHome(<ActualResults game={game} H_or_V={'home'}/>)
                setActualVisitor(<ActualResults game={game} H_or_V={'visitor'}/>)
                setExpectedHome(<GetRosterFromPreviousGame game={game} previousGameId={homePreviousGameId} roster={homeRoster} setRoster={setHomeRoster} teamId={homeTeamId} setTeamId={setTeamId} gameDate={gameDate} setGameDate={setGameDate} selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} H_or_V={'home'} setH_or_V={setH_or_V}/>)
                setExpectedVisitor(<GetRosterFromPreviousGame game={game} previousGameId={visitorPreviousGameId} roster={visitorRoster} setRoster={setVisitorRoster} teamId={visitorTeamId} setTeamId={setTeamId} gameDate={gameDate} setGameDate={setGameDate} selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} H_or_V={'visitor'} setH_or_V={setH_or_V}/>)
                setOddsHome(<Odds selectedSeason={selectedSeason} game={game} homeTeamId={homeTeamId} visitorTeamId={visitorTeamId} H_or_V={'home'}/>)
                setOddsVisitor(<Odds selectedSeason={selectedSeason} game={game} homeTeamId={homeTeamId} visitorTeamId={visitorTeamId} H_or_V={'visitor'}/>)
            */
            }
        }
        if (game) {
            getTeamIds()
        }
    }, [game])
    

    //FOR UPCOMING P8REDICTIONS, PASS IN SOME STRING AS GAME TO GETROSTERFROMPREVIOUSGAME AND SET HOMEPREVIOUSGAMEID = LAST GAME_ID IN THE TABLE
    return (
        <div>{game.game_id !== 'upcoming' ? 
            <div>
                {game.game_date}
                <br></br>
                <div>
                    <div className="column25">
                    <p>H vs. V</p>
                    {matchup ? matchup.substring(0,4) : 'loading'}
                    <br></br>
                    vs.
                    <br></br>
                    {matchup ? matchup.substring(8, 11) : 'loading'}
                    </div>
                    <div className="column25">
                    <p>Exp.</p>
                    {homePreviousGameId && averageScore > 0 ? <GetRosterFromPreviousGame averageScore={averageScore}
                                                                     previousSeason={previousSeason} 
                                                                     homeExpectedResults={homeExpectedResults} 
                                                                     setHomeExpectedResults={setHomeExpectedResults} 
                                                                     visitorExpectedResults={visitorExpectedResults} 
                                                                     setVisitorExpectedResults={setVisitorExpectedResults} 
                                                                     matchup={matchup} 
                                                                     game={game} 
                                                                     previousGameId={homePreviousGameId} 
                                                                     roster={homeRoster} 
                                                                     setRoster={setHomeRoster} 
                                                                     teamId={homeTeamId} 
                                                                     setTeamId={setTeamId} 
                                                                     gameDate={gameDate} 
                                                                     setGameDate={setGameDate} 
                                                                     selectedSeason={selectedSeason} 
                                                                     setSelectedSeason={setSelectedSeason} 
                                                                     H_or_V={'home'} 
                                                                     setH_or_V={setH_or_V}/> : 'loading'}
                    <br></br>
                    {visitorPreviousGameId && averageScore > 0 ? <GetRosterFromPreviousGame averageScore={averageScore} 
                                                                        previousSeason={previousSeason} 
                                                                        homeExpectedResults={homeExpectedResults} 
                                                                        setHomeExpectedResults={setHomeExpectedResults} 
                                                                        visitorExpectedResults={visitorExpectedResults} 
                                                                        setVisitorExpectedResults={setVisitorExpectedResults} 
                                                                        matchup={matchup} 
                                                                        game={game} 
                                                                        previousGameId={visitorPreviousGameId} 
                                                                        roster={visitorRoster} 
                                                                        setRoster={setVisitorRoster} 
                                                                        teamId={visitorTeamId} 
                                                                        setTeamId={setTeamId} 
                                                                        gameDate={gameDate} 
                                                                        setGameDate={setGameDate} 
                                                                        selectedSeason={selectedSeason} 
                                                                        setSelectedSeason={setSelectedSeason} 
                                                                        H_or_V={'visitor'} 
                                                                        setH_or_V={setH_or_V}/> : 'loading'}
                    </div>
                    <div className="column25">
                    <p>Act.</p>
                    {<ActualResults game={game} H_or_V={'home'}/>}
                    <br></br>
                    {<ActualResults game={game} H_or_V={'visitor'}/>}
                    </div>
                    <div className="column25">
                    <p>Odds</p>
                    {<Odds selectedSeason={selectedSeason} game={game} homeTeamId={homeTeamId} visitorTeamId={visitorTeamId} H_or_V={'home'}/>}
                    <br></br>
                    {<Odds selectedSeason={selectedSeason} game={game} homeTeamId={homeTeamId} visitorTeamId={visitorTeamId} H_or_V={'visitor'}/>}
                    </div>
                </div>
            </div>
            :
            <div>
                <span className="header">{game.commence_time.substring(0,10)}</span>
                <br></br>
                <div>
                    <div className="column33">
                    <p>H vs. V</p>
                    {matchup ? matchup.substring(0,4) : 'loading'}
                    <br></br>
                    vs.
                    <br></br>
                    {matchup ? matchup.substring(8, 11) : 'loading'}
                    </div>
                    <div className="column33">
                    <p>Exp.</p>
                    {homePreviousGameId && averageScore > 0? <GetRosterFromPreviousGame averageScore={averageScore} 
                                                                                     previousSeason={previousSeason} 
                                                                                     homeExpectedResults={homeExpectedResults} 
                                                                                     setHomeExpectedResults={setHomeExpectedResults} 
                                                                                     visitorExpectedResults={visitorExpectedResults} 
                                                                                     setVisitorExpectedResults={setVisitorExpectedResults} 
                                                                                     matchup={matchup} 
                                                                                     game={game} 
                                                                                     previousGameId={homePreviousGameId} 
                                                                                     roster={homeRoster} 
                                                                                     setRoster={setHomeRoster} 
                                                                                     teamId={homeTeamId} 
                                                                                     setTeamId={setTeamId} 
                                                                                     gameDate={gameDate} 
                                                                                     setGameDate={setGameDate} 
                                                                                     selectedSeason={selectedSeason} 
                                                                                     setSelectedSeason={setSelectedSeason} 
                                                                                     H_or_V={'home'} 
                                                                                     setH_or_V={setH_or_V}/> : 'loading'}
                    <br></br>
                    {visitorPreviousGameId && averageScore > 0 ? <GetRosterFromPreviousGame averageScore={averageScore}
                                                                                        previousSeason={previousSeason} 
                                                                                        homeExpectedResults={homeExpectedResults} 
                                                                                        setHomeExpectedResults={setHomeExpectedResults} 
                                                                                        visitorExpectedResults={visitorExpectedResults} 
                                                                                        setVisitorExpectedResults={setVisitorExpectedResults} 
                                                                                        matchup={matchup} 
                                                                                        game={game} 
                                                                                        previousGameId={visitorPreviousGameId} 
                                                                                        roster={visitorRoster} 
                                                                                        setRoster={setVisitorRoster} 
                                                                                        teamId={visitorTeamId} 
                                                                                        setTeamId={setTeamId} 
                                                                                        gameDate={gameDate} 
                                                                                        setGameDate={setGameDate} 
                                                                                        selectedSeason={selectedSeason} 
                                                                                        setSelectedSeason={setSelectedSeason} 
                                                                                        H_or_V={'visitor'} 
                                                                                        setH_or_V={setH_or_V}/> : 'loading'}
                    </div>
                    <div className="column33">
                    <p>Odds</p>
                    {game.home_odds}
                    <br></br>
                    <br></br>
                    {game.away_odds}
                </div>
            </div>
        </div>}
    </div>
    )
}

export default ExpectedResults;