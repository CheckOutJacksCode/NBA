import React from 'react';
import logo from './logo.svg';
import './App.css';
import Table from "./components/Table";

const App = () => {
 return (
  <div className="table_container">
   <h1>Sortable table with React</h1>
   <Table table={"boxscorestraditional2015-2016"} season={'2015-2016'}/>
  </div>
 );
};

export default App;
