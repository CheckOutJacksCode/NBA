const TableBody = ({ tableData, columns }) => {
    let idCount = 0;
    return (
     <tbody>
      {tableData.map((data) => {
       return (
        <tr key={idCount}>
         {columns.map(({ accessor }) => {
          const tData = data[accessor] ? data[accessor] : "——";
          idCount++;
          return <td key={accessor}>{tData}</td>;
         })}
        </tr>
       );
      })}
     </tbody>
    );
   };
   
   export default TableBody;