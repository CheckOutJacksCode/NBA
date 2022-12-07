const TableBody = ({ tableData, columns }) => {
    let idCount = 0;
    return (
     <tbody>
      {tableData.map((data) => {
       return (
        <tr key={idCount}>
         {columns.map(({ accessor }) => {
          let tData = data[accessor] ? data[accessor] : "——";
          idCount++;
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