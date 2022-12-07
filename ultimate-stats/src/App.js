import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Table from "./components/Table";
import NavBar from './components/NavBar';
import StatTypeDropDown from './components/StatTypeDropDown';

const App = () => {

    const [tableChoice, setTableChoice] = useState(<Table table={"boxscorestraditional2015-2016"} season={'2015-2016'}/>);

    const getTable = (value) => {
        console.log('woof')
        if (value === 'traditional') {
            console.log('hellllooo')
            setTableChoice(<Table table={"boxscorestraditional2015-2016"} season={'2015-2016'}/>)
        } else if (value === 'advanced') {
            console.log('bark')
            setTableChoice(<Table table={"boxscorestraditional2015-2016"} season={'2015-2016'}/>)
        }
    }
    const handleMenuOne = () => {
        console.log('clicked one');
        getTable('traditional')
    };

    const handleMenuTwo = () => {
        console.log('clicked two');
        getTable('advanced')
    };
    return (
        <div className="table_container">
            <NavBar />
            <StatTypeDropDown
              trigger={<button>Dropdown</button>}
              menu={[
                <button onClick={handleMenuOne}>Menu 1</button>,
                <button onClick={handleMenuTwo}>Menu 2</button>,
              ]}
            />
            <h1>Sortable table with React</h1>
            <div id="tableDiv">
              {tableChoice}
            </div>
        </div>
    );
};

export default App;
