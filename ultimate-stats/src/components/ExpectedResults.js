import axios from "axios";
import '../App.css';
import React, { useEffect, useState } from "react";
import ShotChartSVG from "./ShotChartSVG";
import ShotChartGameSVG from "./ShotChartGameSVG";
import GetRosterFromPreviousGame from "./GetRosterFromPreviousGame";

const ExpectedResults = ({ game, index, expectedResults, setExpectedResults, gameResults, setGameResults, selectedSeason, setSelectedSeason }) => {


    console.log(game)
    console.log(game.game_id)

    const [homeTeamId, setHomeTeamId] = useState('');
    const [visitorTeamId, setVisitorTeamId] = useState('');
    const [roster, setRoster] = useState([]);
    const [gameDate, setGameDate] = useState('');
    const [teamId, setTeamId] = useState('');
    const [previousGameId, setPreviousGameId] = useState('');

    useEffect(() => {
        console.log('effect')
        const getTeamIds = async() => {
            console.log('inside')
            console.log(gameResults[index-1])
            setHomeTeamId(game.home_team_id);
            setVisitorTeamId(game.visitor_team_id);
            setGameDate(game.game_date);
            if (gameResults[index-1]) {
                console.log('yule log')
                setPreviousGameId(gameResults[index-1].game_id);
            } else {
                setPreviousGameId(game.game_id)
            }
        }
        if (game) {
            getTeamIds()
        }
    }, [game])
    
    return (
        <div>{game ? <GetRosterFromPreviousGame game={game} previousGameId={previousGameId} roster={roster} setRoster={setRoster} teamId={homeTeamId} setTeamId={setTeamId} gameDate={gameDate} setGameDate={setGameDate} selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason}/> : 'loading'}</div>
    )
}

export default ExpectedResults;