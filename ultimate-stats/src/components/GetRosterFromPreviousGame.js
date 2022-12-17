import axios from "axios";
import '../App.css';
import React, { useEffect, useState } from "react";
import ShotChartSVG from "./ShotChartSVG";
import ShotChartGameSVG from "./ShotChartGameSVG";

const GetRosterFromPreviousGame = ({ game, previousGameId, roster, setRoster, teamId, setTeamId, gameDate, setGameDate, selectedSeason, setSelectedSeason}) => {
    
    

    useEffect(() => {
        const getRoster = async() => {

            console.log(teamId)
            console.log(previousGameId)
            console.log(game)
            let results = await axios.get(`/boxPlayers/previousgame/gameid/${selectedSeason}/${teamId}/${previousGameId}`);
            let data = results.data;
            console.log(data);
            setRoster(data);
        }
        if (game) {
            getRoster();
        }
    }, [game])
    
    return (
        <div>
            {roster.map((player, index) => (
                <h6 key={index}>{player.player_name}</h6>
            ))}
        </div>
    )
}

export default GetRosterFromPreviousGame;