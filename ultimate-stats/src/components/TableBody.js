const TableBody = ({ tableData, columns }) => {
    return (
     <tbody className="ultimateBody">
      {tableData.map((data, index) => {
       return (
        <tr key={index}>
         {columns.map(({ accessor }) => {
          let tData = data[accessor] ? data[accessor] : "——";
          if (typeof tData === 'number') {
            tData = tData.toFixed(2);
          }
          return <td key={accessor}>{tData}</td>;
         })}
        </tr>
       );
      })}
     </tbody>
    );
   };
   
   export default TableBody;