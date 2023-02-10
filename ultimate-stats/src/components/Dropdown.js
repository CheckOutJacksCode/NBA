import axios from "axios";
import '../App.css';
import React, { useEffect, useState } from "react";
import ShotChartSVG from "./ShotChartSVG";
import ShotChartGameSVG from "./ShotChartGameSVG";
import hoop from "../apis/hoop";


const Dropdown = (props) => {
    let idSeasonCount = 0;
    let idTeamCount = 0;
    let idGameCount = 0;

    let [teamsData, setTeamsData] = useState([]);
    let [seasonsData, setSeasonsData] = useState([]);
    let [gameData, setGameData] = useState([]);
    let [roster, setRosterData] = useState([]);
    let [shotsData, setShotsData] = useState([]);
    let [shotsGameData, setShotsGameData] = useState([]);

    const [playerid, setPlayerId] = useState('');
    const [boxScore, setBoxScore] = useState([]);
    const [gameBox, setGameBox] = useState([]);

    let [selectedTeam, setSelectedTeam] = useState('');
    let [selectedSeason, setSelectedSeason] = useState('');
    let [selectedPlayer, setSelectedPlayer] = useState('');
    let [selectedGame, setSelectedGame] = useState('');


    let options = null;
    let optionsGames = null;
    let shots = null;
    let shotsGame = null;

    useEffect(() => {
        
        let isSubscribed = true;

        const getTeams = async() => {
            let response = await hoop.get(`/api/teamnames`);
            if (isSubscribed) {
                setTeamsData(response.data);
            }
        }
        getTeams();
        return () => isSubscribed = false;
    }, [])
      
    useEffect(() => {
        
      let isSubscribed = true;
        const getSeasons = async() => {
            if (isSubscribed) {
                setSeasonsData([
                    {season: '2015-2016'},
                    {season: '2016-2017'},
                    {season: '2017-2018'},
                    {season: '2018-2019'},
                    {season: '2019-2020'},
                    {season: '2020-2021'},
                    {season: '2021-2022'},
                    {season: '2022-2023'}
                ])
            }
        }
        getSeasons();
        return () => isSubscribed = false;
    }, [])

    useEffect(() => {
        
      let isSubscribed = true;
        const getRoster = async() => {
            let teamid = await hoop.get(`/api/leagueGames/teamid/${selectedTeam}`)
            let response = await hoop.get(`/api/boxPlayers/getroster/${selectedSeason}/${teamid.data[0].team_id}`)
            if (isSubscribed) {
                setRosterData(response.data);
            }
        }
        if (selectedTeam && selectedSeason) {
            getRoster()
        }
        return () => isSubscribed = false;
    }, [selectedSeason, selectedTeam])

    useEffect(() => {
        
      let isSubscribed = true;
        const getGames = async() => {
            let games = await hoop.get(`/api/leagueGames/gameidgamedatematchup/${selectedPlayer}/${selectedSeason}`)
            if (isSubscribed) {
                setGameData(games.data);
            }
        }
        if (selectedPlayer) {
            getGames();
        } else {
            setGameData([])
        }
        return () => isSubscribed = false;
    }, [selectedSeason, selectedTeam, selectedPlayer])
  
    useEffect(() => {
        
      let isSubscribed = true;
        const getShots = async() => {
            let shots = await hoop.get(`/api/shots/${selectedPlayer}/${selectedSeason}`)
            console.log(shots.data);
            if (isSubscribed) {
                setShotsData(shots.data);
            }
        }
        if (selectedPlayer) {
            getShots();
        } else {
            setShotsData([])
        }
        return () => isSubscribed = false;
    }, [selectedSeason, selectedTeam, selectedPlayer])

    useEffect(() => {
        
      let isSubscribed = true;
        const getShotsGame = async() => {
            let shots = await hoop.get(`/api/shots/${selectedPlayer}/${selectedSeason}/${selectedGame.substring(0,10)}`)
            if (isSubscribed) {
                setShotsGameData(shots.data);
            }
        }
        if (playerid && selectedGame) {
            getShotsGame();
        } else {
            setShotsGameData([])
        }
        return () => isSubscribed = false;
    }, [selectedSeason, selectedTeam, selectedPlayer, selectedGame])

    useEffect(() => {
        
        let isSubscribed = true;
            const getPlayerId = async() => {
            
                let playerid = await hoop.get(`/api/playersNBA/${selectedSeason}/${selectedPlayer}`)
                console.log(playerid.data);
                if (isSubscribed) {
                    setPlayerId(playerid.data[0]);
                }
          }
          if (selectedPlayer) {
              getPlayerId();
          }
          return () => isSubscribed = false;
    }, [selectedPlayer])

    useEffect(() => {
        
        let isSubscribed = true;
            const getAverages = async() => {
            
                let boxScore = await hoop.get(`/api/boxScoresTraditional/averages/${playerid.player_id}/${selectedSeason}`)
                if (isSubscribed) {
                    setBoxScore(boxScore.data);
                }
            }
            if (playerid) {

                getAverages();
            }
            return () => isSubscribed = false;
    }, [playerid])  
  
    useEffect(() => {
        
      let isSubscribed = true;
          const getGameStats = async() => {
          
              let boxScore = await hoop.get(`/api/boxScoresTraditional/${selectedSeason}/${selectedGame.substring(0,10)}/${playerid.player_id}`);
              if (isSubscribed) {
                  setGameBox(boxScore.data);
              }
          }
          if (playerid && selectedGame) {
              getGameStats();
          }
          return () => isSubscribed = false;
    }, [playerid, selectedGame])


    function handleTeamChange(event) {
        setSelectedPlayer('')
        setSelectedGame('')
        setSelectedTeam(event.target.value);
        console.log(selectedTeam);
    }

    function handleSeasonChange(event) {
        setSelectedPlayer('')
        setSelectedGame('')
        setSelectedSeason(event.target.value);
    }

    function handlePlayerChange(event) {
        setSelectedGame('')
        setSelectedPlayer(event.target.value);
    }

    function handleGameChange(event) {
        setSelectedGame(event.target.value);
    }
    
    if (roster) {
        let idCountRoster = 0;
        options = roster.map((option) => <option key={idCountRoster++} value={option['player_name']}>{option['player_name']}</option>);
    }

    if (gameData) {
        let idGameCount = 0;
        optionsGames = gameData.map((option) => <option key={idGameCount++} value={Object.values(option)}>{Object.values(option)}</option>);
    }
/*
    if (shotsData.length > 0 && boxScore.length > 0) {
        console.log('in here')
        shots = <ShotChartSVG shotsData={shotsData} playerid={playerid} boxData={boxScore} season={selectedSeason}/>
    }
    if (shotsGameData.length > 0) {
        console.log(shotsGameData)
        console.log(shotsData)
        shotsGame = <ShotChartSVG shotsData={shotsGameData} playerid={playerid} boxData={boxScore} season={selectedSeason}/>
        console.log(shotsGame)
        console.log(shots);
    }*/

    return (
      <label>
        {props.label}

        <select value={selectedSeason} onChange={handleSeasonChange}>
          <option value="0">Select Season</option>

          {seasonsData.map((option) => (
            <option key={idSeasonCount++} value={Object.values(option)}>{Object.values(option)}</option>
          ))}
          
        </select>
        <select value={selectedTeam} onChange={handleTeamChange}>
          <option value="0">Select Team</option>

          {teamsData.map((option) => (
            <option key={idTeamCount++} value={Object.values(option)}>{Object.values(option)}</option>
          ))}
          
        </select>
        <select value={selectedPlayer} onChange={handlePlayerChange}>
          <option value="0">Select Player</option>
        {options}
        </select>
        <select value={selectedGame} onChange={handleGameChange}>
          <option value="0">Select Game</option>
          {optionsGames}
        </select>
        <br></br>
        <br></br>
        <div className="graph-svg-component">{shotsData.length > 0 ? <ShotChartSVG shotsData={shotsData} playerid={playerid} boxData={boxScore} season={selectedSeason}/>: 'select season, team, and player to display season shot chart'}</div>
        <div className="graph-svg-component">{shotsGameData.length > 0 && gameBox.length > 0 ? <ShotChartGameSVG shotsData={shotsGameData} playerid={playerid} boxData={gameBox} season={selectedSeason}/> : 'once season and player are selected, select individual game shot chart'}</div>
      </label>
    );
        
};
        
export default Dropdown;