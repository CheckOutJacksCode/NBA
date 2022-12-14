import axios from "axios";
import Dropdown from "../components/Dropdown"
import React, { useEffect, useState } from "react";
import TeamsDropdown from "../components/TeamsDropdown";
import SeasonsDropdown from "../components/SeasonsDropdown";
import Schedule from "../components/Schedule";


const Jackarithm = () => {
    
    const [teamsData, setTeamsData] = useState([]);
    const [seasonsData, setSeasonsData] = useState([]);
    const [scheduleData, setScheduleData] = useState([]);

    const [selectedHomeTeam, setSelectedHomeTeam] = useState('');
    const [selectedVisitorTeam, setSelectedVisitorTeam] = useState('');
    const [selectedSeason, setSelectedSeason] = useState('');



    return (
        <div>
        <h1>
          <TeamsDropdown teamsData={teamsData} setTeamsData={setTeamsData} selectedTeam={selectedHomeTeam} setSelectedTeam={setSelectedHomeTeam} H_or_V={'home'}/>
          <TeamsDropdown teamsData={teamsData} setTeamsData={setTeamsData} selectedTeam={selectedVisitorTeam} setSelectedTeam={setSelectedVisitorTeam} H_or_V={'visitor'}/>
          <SeasonsDropdown seasonsData={seasonsData} setSeasonsData={setSeasonsData} selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason}/>
          <Schedule selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} scheduleData={scheduleData} setScheduleData={setScheduleData}/>
        </h1>
      </div>         
    )
}

export default Jackarithm;