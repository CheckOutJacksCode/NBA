const ResultsTableBody = ({ columns, tableData, deletePlayer }) => {

  return (
    <tbody>
      {tableData.map((data, index) => (

        <tr key={index}>
          <td>
            {columns[index]}
          </td>
          <td>
            {data}
          </td>
        </tr>
        
      ))}
    </tbody>
  )
}

 

export default ResultsTableBody;