import axios from "axios";
import '../App.css';
import React, { useEffect, useState } from "react";
import ShotChartSVG from "./ShotChartSVG";
import ShotChartGameSVG from "./ShotChartGameSVG";
import GetRosterFromPreviousGame from "./GetRosterFromPreviousGame";

const ExpectedResults = ({ game, index, expectedResults, setExpectedResults, gameResults, setGameResults, selectedSeason, setSelectedSeason }) => {

    const [homeTeamId, setHomeTeamId] = useState('');
    const [visitorTeamId, setVisitorTeamId] = useState('');
    const [homeRoster, setHomeRoster] = useState([]);
    const [visitorRoster, setVisitorRoster] = useState([]);
    const [gameDate, setGameDate] = useState('');
    const [teamId, setTeamId] = useState('');
    const [homePreviousGameId, setHomePreviousGameId] = useState('');
    const [visitorPreviousGameId, setVisitorPreviousGameId] = useState('');
    const [H_or_V, setH_or_V] = useState('');

    

    useEffect(() => {
        const getPreviousGameIds = async() => {
            console.log(game.game_id)
            console.log(selectedSeason)
            console.log(homeTeamId)
            let homePrevious = await axios.get(`/boxScoresTraditional/previousgameid/${game.game_id}/${selectedSeason}/${homeTeamId}`)
            console.log(homePrevious.data);
            if (homePrevious.data.length > 0) {
                setHomePreviousGameId(homePrevious.data[0].game_id)
            } else {
                setHomePreviousGameId('1')
            }
            let visitorPrevious = await axios.get(`/boxScoresTraditional/previousgameid/${game.game_id}/${selectedSeason}/${visitorTeamId}`)
            if (visitorPrevious.data.length > 0) {
                setVisitorPreviousGameId(visitorPrevious.data[0].game_id)
            } else {
                setVisitorPreviousGameId('1')
            }
        } 
        if (homeTeamId && visitorTeamId) {
            getPreviousGameIds();
        }
    }, [game, homeTeamId, visitorTeamId, selectedSeason])

    useEffect(() => {
        const getTeamIds = async() => {
            setHomeTeamId(game.home_team_id);
            setVisitorTeamId(game.visitor_team_id);
            setGameDate(game.game_date);
        }
        if (game) {
            getTeamIds()
        }
    }, [game])
    
    //FOR UPCOMING PREDICTIONS, PASS IN SOME STRING AS GAME TO GETROSTERFROMPREVIOUSGAME AND SET HOMEPREVIOUSGAMEID = LAST GAME_ID IN THE TABLE
    return (
        <div className="row">
            {game.game_date}
            <br></br>
            {game.matchup}
            <div className="row">
                <div className="column">
                <h6>Expected</h6>
                {game.matchup.substring(0,4)} {homePreviousGameId ? <GetRosterFromPreviousGame game={game} previousGameId={homePreviousGameId} roster={homeRoster} setRoster={setHomeRoster} teamId={homeTeamId} setTeamId={setTeamId} gameDate={gameDate} setGameDate={setGameDate} selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} H_or_V={'home'} setH_or_V={setH_or_V}/> : 'loading'}
                <br></br>
                {game.matchup.substring(8, 11)} {visitorPreviousGameId ? <GetRosterFromPreviousGame game={game} previousGameId={visitorPreviousGameId} roster={visitorRoster} setRoster={setVisitorRoster} teamId={visitorTeamId} setTeamId={setTeamId} gameDate={gameDate} setGameDate={setGameDate} selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} H_or_V={'visitor'} setH_or_V={setH_or_V}/> : 'loading'}
                </div>
                <div className="column">
                <h6>Actual</h6>
                {game.matchup.substring(0,4)} {homePreviousGameId ? <GetRosterFromPreviousGame game={game} previousGameId={homePreviousGameId} roster={homeRoster} setRoster={setHomeRoster} teamId={homeTeamId} setTeamId={setTeamId} gameDate={gameDate} setGameDate={setGameDate} selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} H_or_V={'home'} setH_or_V={setH_or_V}/> : 'loading'}
                <br></br>
                {game.matchup.substring(8, 11)} {visitorPreviousGameId ? <GetRosterFromPreviousGame game={game} previousGameId={visitorPreviousGameId} roster={visitorRoster} setRoster={setVisitorRoster} teamId={visitorTeamId} setTeamId={setTeamId} gameDate={gameDate} setGameDate={setGameDate} selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} H_or_V={'visitor'} setH_or_V={setH_or_V}/> : 'loading'}
                </div>
            </div>
        </div>
    )
}

export default ExpectedResults;