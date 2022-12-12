import React, {useState} from 'react';
import logo from '../logo.svg';
import Table from "../components/Table";
import NavBar from '../NavBar';
import StatTypeDropDown from '../components/StatTypeDropDown';
import TableAdvanced from '../components/TableAdvanced';
import '../App.css';

const Home = () => {

    const [tableChoice, setTableChoice] = useState(<Table season={'2015-2016'}/>);

    const getTable = (value) => {
        console.log('woof')
        if (value === 'traditional') {
            console.log('hellllooo')
            setTableChoice(<Table season={'2015-2016'}/>)
        } else if (value === 'advanced') {
            console.log('bark')
            setTableChoice(<TableAdvanced season={'2015-2016'}/>)
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
        <div>
            <StatTypeDropDown
              trigger={<button>Dropdown</button>}
              menu={[
                <button onClick={handleMenuOne}>Menu 1</button>,
                <button onClick={handleMenuTwo}>Menu 2</button>,
              ]}
            />
            <h1>ULTIMATE STATS</h1>
            <div>
              {tableChoice}
            </div>
        </div>
    );
};

export default Home;