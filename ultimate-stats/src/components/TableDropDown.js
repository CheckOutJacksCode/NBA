import axios from "axios";
import '../App.css';
import React, { useEffect, useState } from "react";
import TableAdvanced from "./TableAdvanced";
import Table from "./Table";
import HustleTable from "./HustleTable";

const TableDropdown = ({ tables, setTables, tableChoice, setTableChoice, selectedSeason, setSelectedSeason }) => {


    useEffect(() => {
        
        let isSubscribed = true;
            const getTables = async() => {
                if (isSubscribed) {
                    setTables([
                        {stats: 'traditional'},
                        {stats: 'advanced'},
                        {stats: 'hustle'}
                    ])
                }
            }
            if (selectedSeason) {
                getTables();
            }
            return () => isSubscribed = false;
      }, [])

    function handleTableChange(event) {
        if (event.target.value === 'traditional') {
            setTableChoice(<Table selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} />);
        } else if (event.target.value === 'advanced') {
            setTableChoice(<TableAdvanced selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} />);
        } else if (event.target.value === 'hustle') {
            setTableChoice(<HustleTable selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} />);
        }
        console.log(selectedSeason)
    }

    return (
        <div>
        <select value={tableChoice} onChange={handleTableChange}>
          <option value="0">Select Stats</option>

          {tables.map((option, index) => (
            <option key={index} value={Object.values(option)}>{Object.values(option)}</option>
          ))}
        </select>
        </div>
    );
        
};
        
export default TableDropdown;