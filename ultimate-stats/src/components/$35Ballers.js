import axios from "axios";
import React, { useEffect, useState } from "react";
import '../App.css';
import BallerTableBody from "./BallerTableBody";
import TableHead from "./TableHead";
import hoop from "../apis/hoop";

const $35Ballers = ({ teamName, teamSalary, totalRatingUser }) => {
    
    const [baller, setBaller] = useState([]);
    const [postBaller, setPostBaller] = useState(false);
    const [ballers, setBallers] = useState([]);
    
    let highscore = { name: teamName.value, score: totalRatingUser, salary: teamSalary };
    

    useEffect(() => {
        const postBaller = async() => {
            try {
                let response = await hoop.post(`/api/users/ballers`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    body: highscore,
                })
                if (response.ok) {
                    
                    const jsonResponse = response.json();
                    setPostBaller(true);
                    return jsonResponse;
                }
            } catch (error) {
                console.log(error);
            }
            let results = await hoop.get('/api/users/ballers');
            setBallers(results.data);
        }
        if (baller && totalRatingUser > 0) {
            postBaller();
        }
    }, [baller])

    const handleClick = () => {
        setBaller(highscore);
    }

    useEffect(() => {
        const getBallers = async() => {
            let results = await hoop.get('/api/users/ballers');
            setBallers(results.data);
        }
        getBallers();
    }, [])

    let columns = [
        { label: 'TEAM', accessor: 'name' },
        { label: 'SCORE', accessor: 'score' },
        { label: 'SALARY', accessor: 'salary' }
    ]

    return (
        <div>
            <button onClick={handleClick}>Submit High Score</button>
            { ballers.length > 0 ? 
            <table className="ballers">
                <TableHead columns={columns}/>
                <BallerTableBody columns={columns} tableData={ballers} />
            </table> : null }
        </div>
    )
}

export default $35Ballers;