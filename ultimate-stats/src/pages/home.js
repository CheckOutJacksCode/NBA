import React, {useState, useEffect} from 'react';
import '../App.css';
import Table from '../components/Table';
import SeasonsDropdown from '../components/SeasonsDropdown';
import TableDropdown from '../components/TableDropDown';
import hoop from '../apis/hoop';
import LeadersStatTable from '../components/LeadersStatTable';

const Home = () => {

    const [selectedSeason, setSelectedSeason] = useState('2022-2023');
    const [seasonsData, setSeasonsData] = useState([]);
    const [tableChoice, setTableChoice] = useState(<Table selectedSeason={selectedSeason}/>);
    const [tables, setTables] = useState([]);
    const [stats, setStats] = useState([]);
    
    const statLabels = [
        {label: "POINTS PER GAME", accessor: "pts"},
        {label: "REBOUNDS PER GAME", accessor: "reb"},
        {label: "ASSISTS PER GAME", accessor: "ast"},
        {label: "STEALS PER GAME", accessor: "stl"},
        {label: "BLOCKS PER GAME", accessor: "blk"},
        {label: "FIELD GOAL PERCENTAGE", accessor: "fg_pct"},
        {label: "THREE POINTERS MADE", accessor: "fg3m"},
        {label: "THREE POINT PERCENTAGE", accessor: "fg3_pct"},
        {label: "PLUS-MINUS", accessor: "plus_minus"}
    ]

    useEffect(() => {

        const getAllQualified = async() => {
            let pts = await hoop.get(`/api/statranked/ptsLeaders/${selectedSeason}`);
            console.log(pts.data)
            let reb = await hoop.get(`/api/statranked/rebLeaders/${selectedSeason}`);
            console.log(reb.data)
            let ast = await hoop.get(`/api/statranked/astLeaders/${selectedSeason}`);
            console.log(ast.data)
            let stl = await hoop.get(`/api/statranked/stlLeaders/${selectedSeason}`);
            console.log(stl.data)
            let blk = await hoop.get(`/api/statranked/blkLeaders/${selectedSeason}`);
            console.log(blk.data)
            let fg_pct = await hoop.get(`/api/statranked/fgPctLeaders/${selectedSeason}`);
            console.log(fg_pct.data)
            let fg3m = await hoop.get(`/api/statranked/fg3mLeaders/${selectedSeason}`);
            console.log(fg3m.data)
            let fg3_pct = await hoop.get(`/api/statranked/fg3PctLeaders/${selectedSeason}`);
            console.log(fg3_pct.data)
            let plus_minus = await hoop.get(`/api/statranked/plusMinusLeaders/${selectedSeason}`);
            console.log(plus_minus.data)
            setStats([pts.data, reb.data, ast.data, stl.data, blk.data, fg_pct.data, fg3m.data, fg3_pct.data, plus_minus.data])
        }
        getAllQualified();
    }, [selectedSeason])



    return (
        <div>
      
          <div className="leaders-grid">
            {stats.length > 0 ? stats.map((stat, index) => (
                <div key={index} className="leaders-stat">
                    <LeadersStatTable stat={stat} index={index} statLabels={statLabels} />
                </div>
            )) : 'loading'}
          </div>
          <div className="table-container">
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
              <div>
                  {selectedSeason ? tableChoice : 'loading'}
              </div>
          </div>
        </div>
    )
}

export default Home;