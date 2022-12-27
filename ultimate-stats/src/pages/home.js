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

const Home = () => {

    const [selectedSeason, setSelectedSeason] = useState('2022-2023');
    const [seasonsData, setSeasonsData] = useState([]);
    const [tableChoice, setTableChoice] = useState(<Table selectedSeason={selectedSeason}/>);
    const [tables, setTables] = useState([]);

    return (
        <div>
            <div className="dropdown">
            <h1>PLAYER CAREER STATS</h1>
            <PlayerStats />
            </div>
            <div className="dropdown">
            <h1>ULTIMATE STATS</h1>
            <SeasonsDropdown seasonsData={seasonsData} setSeasonsData={setSeasonsData} selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} />
            <TableDropdown tables={tables} setTables={setTables} tableChoice={tableChoice} setTableChoice={setTableChoice} selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} />
            </div>
            <br></br>
            <div>
              {selectedSeason ? tableChoice : 'loading'}
            </div>
        </div>
    );
};

export default Home;