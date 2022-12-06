import React, { useEffect, useState } from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
//import tableData1 from "../data.json";
import axios from "axios";

const Table = () => {
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        axios.get(`/statranked/2015-2016`) // your url may look different
        .then(data => {
            let nonNumeric = ['player_id', 'player_name', 'team_id', 'team_abbreviation']
            
            setTableData(data.data)
            
        }) // set data to state
            
    }, []);
    console.log(tableData);
    //let headers = await fetch(`/statsheaders/${props.table}`);
    //let tableData1 = await fetch(`/statsranked/${headers[9]}/${props.season}`);

    const columns = [
        { label: "NAME", accessor: "player_name" },
        { label: "TEAM", accessor: "team_abbreviation" },
        { label: "MIN", accessor: "min" },
        { label: "FGM", accessor: "fgm" },
        { label: "FGA", accessor: "fga" },
        { label: "FG PCT", accessor: "fg_pct" },
        { label: "FG3M", accessor: "fg3m" },
        { label: "FG3A", accessor: "fg3a" },
        { label: "FG3 PCT", accessor: "fg3_pct" },
        { label: "FTM", accessor: "ftm" },
        { label: "FTA", accessor: "fta" },
        { label: "FT PCT", accessor: "ft_pct" },
        { label: "OREB", accessor: "oreb" },
        { label: "DREB", accessor: "dreb" },
        { label: "REB", accessor: "reb" },
        { label: "AST", accessor: "ast" },
        { label: "STL", accessor: "stl" },
        { label: "BLK", accessor: "blk" },
        { label: "TO", accessor: "to" },
        { label: "+/-", accessor: "plus_minus" },

    ];

/*
    const columns = [
        { label: "NAME", accessor: "player_name" },
        //{ label: "TEAM", accessor: "team_abbreviation" },
        { label: "MIN", accessor: "avg" },
    ];*/
    const handleSorting = (sortField, sortOrder) => {
        if (sortField) {
         const sorted = [...tableData].sort((a, b) => {
          if (a[sortField] === null) return 1;
          if (b[sortField] === null) return -1;
          if (a[sortField] === null && b[sortField] === null) return 0;
          return (
           a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
           }) * (sortOrder === "asc" ? 1 : -1)
          );
         });
         setTableData(sorted);
        }
    };

    return (
     <>
      <table className="table">
       <caption>
        Developers currently enrolled in this course, column headers are sortable.
       </caption>
       <TableHead columns={columns} handleSorting={handleSorting}/>
       <TableBody columns={columns} tableData={tableData} />
      </table>
     </>
    );
};

export default Table;