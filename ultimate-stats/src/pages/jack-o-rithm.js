import axios from "axios";
import Dropdown from "../components/Dropdown"
import React, { useEffect, useState } from "react";
import TeamsDropdown from "../components/TeamsDropdown";
import SeasonsDropdown from "../components/SeasonsDropdown";
import Schedule from "../components/Schedule";
import PredictionResultsTable from "../components/JackODropDown";
import GameResults from "../components/GameResults";
import GameRangeDropdown from "../components/GameRangeDropdown";
import Upcoming from "../components/Upcoming";
import '../App.css'
import PostMatchups from "../components/PostMatchups";
import HistoricalResults from "../components/HistoricalResults";
import WinPct from "../components/WinPct";

const Jackarithm = () => {
    
    const [teamsData, setTeamsData] = useState([]);
    const [seasonsData, setSeasonsData] = useState([]);
    const [scheduleData, setScheduleData] = useState([]);
    const [gameResults, setGameResults] = useState([]);

    const [gameRange, setGameRange] = useState([]);

    const [selectedHomeTeam, setSelectedHomeTeam] = useState('');
    const [selectedVisitorTeam, setSelectedVisitorTeam] = useState('');
    const [selectedSeason, setSelectedSeason] = useState('2022-2023');
    const [selectedGameRange, setSelectedGameRange] = useState(0);



    const [teamsH, setTeamsH] = useState([]);
    const [teamsV, setTeamsV] = useState([]);
/*
    useEffect(() => {
        const postMatchups = async() => {
            <PostMatchups selectedSeason={selectedSeason}
                          setSelectedSeason={setSelectedSeason}
                          homeExpectedResults={homeExpectedResults}
                          setHomeExpectedResults={setHomeExpectedResults}
                          visitorExpectedResults={setVisitorExpectedResults}
                          setVisitorExpectedResults={setVisitorExpectedResults}/>
        }
        postMatchups()
    }, [])*/
    //<Schedule selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} scheduleData={scheduleData} setScheduleData={setScheduleData}/>

    return (
      <div>
        <div className="column80">
          <h1>
            Historical Results
          </h1>
          <h1>
            <SeasonsDropdown seasonsData={seasonsData} setSeasonsData={setSeasonsData} selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason}/>
          </h1>
            <HistoricalResults selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason}/>
        </div>
        <div className="col20ballers">
          <h1>
            Upcoming Predictions
          </h1>
          <WinPct selectedSeason={selectedSeason} />
          <br></br>
          <Upcoming //homeExpectedResults={homeExpectedResults}
                    //setHomeExpectedResults={setHomeExpectedResults}
                    //visitorExpectedResults={visitorExpectedResults}
                    //setVisitorExpectedResults={setVisitorExpectedResults}
                    />
        </div>
      </div>         
    )
}

export default Jackarithm;