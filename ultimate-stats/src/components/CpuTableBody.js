import React, { useEffect, useState } from "react";
import axios from "axios";
import '../App.css';
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import Price from "./Price";

const CpuTableBody = ({ columns, tableData, deletePlayer }) => {


    return (
        <tbody>
         {tableData.map((data, index) => {
          return (
           <tr key={index} className='roster'>
            {columns.map(({ accessor }) => {
             let tData;
             if (accessor === 'player_name') {
               tData = data.player[accessor] ? data.player[accessor] : "——";
             }
             else if (accessor === 'totals') {
               tData = parseFloat(data.player['pts']) + parseFloat(data.player['ast']) + parseFloat(data.player['reb']) ? 
                       parseFloat(data.player['pts']) + parseFloat(data.player['ast']) + parseFloat(data.player['reb']) : "——";
             } else {     
               tData = data.player[accessor] ? data.player[accessor] : "——";
             }
             if (typeof tData === 'number') {
               tData = tData.toFixed(2);
             }
             return <td key={accessor} className='centered'>{tData}</td>;
            })}
           </tr>
          );
         })}
        </tbody>
       );
}

export default CpuTableBody;