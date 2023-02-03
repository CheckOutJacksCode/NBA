import React, {useState} from 'react';
import '../App.css';
import SeasonsDropdown from '../components/SeasonsDropdown';
import BoxScoresTraditionalTable from '../components/BoxScoresTraditionalTable';
import TableDropdown from '../components/TableDropDown';
import Price from '../components/Price';
import RosterTable from '../components/RosterTable';
import TeamName from '../components/TeamName';
import UserCapSpace from '../components/UserCapSpace';
import ErrorMessages from '../components/ErrorMessages';
import ComputerRoster from '../components/ComputerRoster';
import ComputerTeamName from '../components/ComputerTeamName';
import ComputerSalary from '../components/ComputerSalary';
import LockButton from '../components/LockButton';
import MatchupResults from '../components/MatchupResults';
import Dnd from '../components/Dnd';
import Table from '../components/Table';
import ResultsTableBody from '../components/ResultsTableBody';
import ResultsTableHead from '../components/ResultsTableHead';
import $35Ballers from '../components/$35Ballers';

const Home = () => {

    const [selectedSeason, setSelectedSeason] = useState('2022-2023');
    const [seasonsData, setSeasonsData] = useState([]);
    const [tableChoice, setTableChoice] = useState(<Table selectedSeason={selectedSeason}/>);
    const [tables, setTables] = useState([]);
    const [roster, setRoster] = useState([]);
    const [dragRoster, setDragRoster] = useState([]);
    const [cpuRoster, setCpuRoster] = useState([]);
    const [teamSalary, setTeamSalary] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [usedPlayers, setUsedPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState('');

    const [oneDollarPlayers, setOneDollarPlayers] = useState([]);
    const [twoDollarPlayers, setTwoDollarPlayers] = useState([]);
    const [threeDollarPlayers, setThreeDollarPlayers] = useState([]);
    const [fourDollarPlayers, setFourDollarPlayers] = useState([]);
    const [fiveDollarPlayers, setFiveDollarPlayers] = useState([]);
    const [sixDollarPlayers, setSixDollarPlayers] = useState([]);
    const [sevenDollarPlayers, setSevenDollarPlayers] = useState([]);

    const [starters, setStarters] = useState([]);
    const [lockFlag, setLockFlag] = useState(false);
    const [gameResultsUser, setGameResultsUser] = useState([]);
    const [gameResultsCpu, setGameResultsCpu] = useState([]);
    const [submitFlag, setSubmitFlag] = useState(false);
    const [teamName, setTeamName] = useState({ value: '' });
    const [cpuName, setCpuName] = useState('');
    const [totalRatingUser, setTotalRatingUser] = useState(0);
    const [totalRatingCpu, setTotalRatingCpu] = useState(0);


    let columns = ['Finishing', 'Shooting', 'Rebound/Defense', 'Playmaking'];


    const deletePlayer = (player) => {
        let rows = [...roster];
        let newRows = rows.filter(eachPlayer =>
            eachPlayer !== player.rosterPlayer
        )
        setRoster(newRows);
        setTeamSalary((teamSalary) => teamSalary - parseInt(player.salary))
        setUsedPlayers(usedPlayers.filter(eachPlayer => eachPlayer !== player.rosterPlayer))
        setSelectedPlayer('');
        setErrorMessage('');
    }

    const makeStarter = (index) => {
        if (starters.length < 5) {
            setStarters([
                ...starters,
                roster[index]
            ])
        } else {
            setErrorMessage('Select 5 players for starting lineup')
        }
    }

    return (
        <div>

            <h4 className='caption'>Draft your team from the drop down menus, then click 'Lock in Roster' to
                face off against the computer. Must draft 10 players, with a total salary
                of $35 or less.
            </h4>
            <div className='priceMenus'>
                <Price selectedSeason={selectedSeason} 
                        roster={roster} setRoster={setRoster} 
                        teamSalary={teamSalary} 
                        setTeamSalary={setTeamSalary}
                        errorMessage={errorMessage}
                        setErrorMessage={setErrorMessage}
                        usedPlayers={usedPlayers}
                        setUsedPlayers={setUsedPlayers}
                        selectedPlayer={selectedPlayer}
                        setSelectedPlayer={setSelectedPlayer}
                        oneDollarPlayers={oneDollarPlayers}
                        setOneDollarPlayers={setOneDollarPlayers}
                        twoDollarPlayers={twoDollarPlayers}
                        setTwoDollarPlayers={setTwoDollarPlayers}
                        threeDollarPlayers={threeDollarPlayers}
                        setThreeDollarPlayers={setThreeDollarPlayers}
                        fourDollarPlayers={fourDollarPlayers}
                        setFourDollarPlayers={setFourDollarPlayers}
                        fiveDollarPlayers={fiveDollarPlayers}
                        setFiveDollarPlayers={setFiveDollarPlayers}
                        sixDollarPlayers={sixDollarPlayers}
                        setSixDollarPlayers={setSixDollarPlayers}
                        sevenDollarPlayers={sevenDollarPlayers}
                        setSevenDollarPlayers={setSevenDollarPlayers}
                         />
            </div>
            <br>
            </br>
            <div className="row">
                <div className="column25">
                    <TeamName submitFlag={submitFlag} setSubmitFlag={setSubmitFlag} teamName={teamName} setTeamName={setTeamName} />
                    {roster.length > 0 ? <Dnd dragRoster={dragRoster} setDragRoster={setDragRoster} roster={roster} setRoster={setRoster} deletePlayer={deletePlayer} /> : ''}
                </div>
                <div className="column25Salary">
                    <br>
                    </br>
                    <ErrorMessages errorMessage={errorMessage} setErrorMessage={setErrorMessage} roster={roster} />
                    <UserCapSpace teamSalary={teamSalary} setTeamSalary={setTeamSalary} deletePlayer={deletePlayer} />
                    <table className='resultsTable'>
                      { gameResultsUser.length > 0 ? <ResultsTableBody columns={columns} tableData={gameResultsUser} /> : null }
                    </table>
                </div>
                <div className="column25Salary">
                    <br>
                    </br>
                    <ComputerSalary cpuRoster={cpuRoster} />
                    <table className='resultsTable'>
                      { gameResultsCpu.length > 0 ? <ResultsTableBody columns={columns} tableData={gameResultsCpu} /> : null }
                    </table>
                </div>
                <div className="column25">
                    <ComputerTeamName cpuRoster={cpuRoster} cpuName={cpuName} setCpuName={setCpuName} />
                    <ComputerRoster selectedSeason={selectedSeason}
                                    usedPlayers={usedPlayers}
                                    setUsedPlayers={setUsedPlayers}
                                    selectedPlayer={selectedPlayer}
                                    setSelectedPlayer={setSelectedPlayer}
                                    oneDollarPlayers={oneDollarPlayers}
                                    setOneDollarPlayers={setOneDollarPlayers}
                                    twoDollarPlayers={twoDollarPlayers}
                                    setTwoDollarPlayers={setTwoDollarPlayers}
                                    threeDollarPlayers={threeDollarPlayers}
                                    setThreeDollarPlayers={setThreeDollarPlayers}
                                    fourDollarPlayers={fourDollarPlayers}
                                    setFourDollarPlayers={setFourDollarPlayers}
                                    fiveDollarPlayers={fiveDollarPlayers}
                                    setFiveDollarPlayers={setFiveDollarPlayers}
                                    sixDollarPlayers={sixDollarPlayers}
                                    setSixDollarPlayers={setSixDollarPlayers}
                                    sevenDollarPlayers={sevenDollarPlayers}
                                    setSevenDollarPlayers={setSevenDollarPlayers}
                                    roster={roster}
                                    cpuRoster={cpuRoster}
                                    setCpuRoster={setCpuRoster}
                                    lockFlag={lockFlag}
                                    setLockFlag={setLockFlag} />
                </div>
            </div>
            
            <br>
            </br>
            <MatchupResults lockFlag={lockFlag} 
                            setLockFlag={setLockFlag}
                            dragRoster={dragRoster} 
                            selectedSeason={selectedSeason} 
                            roster={roster} 
                            cpuRoster={cpuRoster} 
                            setCpuRoster={setCpuRoster}
                            gameResultsUser={gameResultsUser}
                            setGameResultsUser={setGameResultsUser}
                            gameResultsCpu={gameResultsCpu}
                            setGameResultsCpu={setGameResultsCpu}
                            totalRatingUser={totalRatingUser}
                            setTotalRatingUser={setTotalRatingUser}
                            totalRatingCpu={totalRatingCpu}
                            setTotalRatingCpu={setTotalRatingCpu} />
            <br>
            </br>
            <div className="centerText">
                <LockButton lockFlag={lockFlag} setLockFlag={setLockFlag} roster={roster} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
            </div>
            <div className='row'>
                <div className='column66'>
                    <br>
                    </br>
                    <SeasonsDropdown seasonsData={seasonsData} 
                                    setSeasonsData={setSeasonsData} 
                                    selectedSeason={selectedSeason} 
                                    setSelectedSeason={setSelectedSeason} />
                    <TableDropdown tables={tables} 
                                    setTables={setTables} 
                                    tableChoice={tableChoice} 
                                    setTableChoice={setTableChoice} 
                                    selectedSeason={selectedSeason} 
                                    setSelectedSeason={setSelectedSeason} />

                    <br></br>
                    {selectedSeason ? tableChoice : 'loading'}
                </div>
                <div className='column33'>
                    <$35Ballers teamName={teamName} teamSalary={teamSalary} totalRatingUser={totalRatingUser} />
                </div>
            </div>
        </div>
    );
};

export default Home;