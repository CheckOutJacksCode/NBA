import React, {useState} from 'react';
import logo from '../logo.svg';
import Table from "../components/Table";
import NavBar from '../NavBar';
import StatTypeDropDown from '../components/StatTypeDropDown';
import TableAdvanced from '../components/TableAdvanced';
import '../App.css';
import SeasonsDropdown from '../components/SeasonsDropdown';
import HustleTable from '../components/HustleTable';
import TableDropdown from '../components/TableDropDown';
import PlayerStats from '../components/PlayerStats';
import CarmeloFactor from '../components/CarmeloFactor';

const Home = () => {

    const [selectedSeason, setSelectedSeason] = useState('2022-2023');
    const [seasonsData, setSeasonsData] = useState([]);

    return (
        <div>
            <div className="dropdown">
            <h1>CUMULATIVE STATS</h1>
            <SeasonsDropdown seasonsData={seasonsData} setSeasonsData={setSeasonsData} selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} />
            <br></br>
            <CarmeloFactor selectedSeason={selectedSeason} />
            </div>
        </div>
    );
};

export default Home;