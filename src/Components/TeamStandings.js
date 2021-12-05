import '../CSS/TeamStandings.css';

import { useState, useEffect } from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';

function TeamStandings(){

    var [divisionNo, setDivisionNo] = useState(0);
    var [divisionArr, setDivisionArr] = useState([]);
    var [cssCentral, setCSSCentral] = useState('Central');
    var [cssAtlantic, setCSSAtlantic] = useState('Atlantic');
    var [cssMetropolitan, setCSSMetropolitan] = useState('Metropolitan-Active');
    var [cssPacific, setCSSPacific] = useState('Pacific');

    useEffect(()=>{
        const axios = require('axios');
        axios.get('https://statsapi.web.nhl.com/api/v1/standings').then(res => {
        
        setDivisionArr(res.data.records[divisionNo].teamRecords);
        
      
      });
    }, [divisionNo]); 

    useEffect(()=>{
        switch(divisionNo){
            case 0:
                setCSSMetropolitan('Metropolitan-Active');
                setCSSAtlantic('Atlantic');
                setCSSCentral('Central');
                setCSSPacific('Pacific');
            break;

            case 1:
                setCSSMetropolitan('Metropolitan');
                setCSSAtlantic('Atlantic-Active');
                setCSSCentral('Central');
                setCSSPacific('Pacific');
            break;

            case 2:
                setCSSMetropolitan('Metropolitan');
                setCSSAtlantic('Atlantic');
                setCSSCentral('Central-Active');
                setCSSPacific('Pacific');
            break;

            case 3:
                setCSSMetropolitan('Metropolitan');
                setCSSAtlantic('Atlantic');
                setCSSCentral('Central');
                setCSSPacific('Pacific-Active');
            break;

            default:
                setCSSMetropolitan('Metropolitan-Active');
            
        }
    },[divisionNo])

    

    return(
        <div className = 'Team-Standings-Container'>
            <div className = 'Team-Standings-Title'>
                <h1 className = 'H1-TeamStandings'> Team Standings</h1>
            </div>
            <div className = 'Division-Container'>
                <div className = {cssMetropolitan} onClick = {(e)=> setDivisionNo(0)}>
                    <h3>MET</h3>
                </div>
                <div className = {cssAtlantic} onClick = {()=> setDivisionNo(1)}>
                    <h3>ATL</h3>
                </div>
                <div className = {cssCentral} onClick = {()=> setDivisionNo(2)}>
                    <h3>CEN</h3>
                </div>
                <div className = {cssPacific} onClick = {()=> setDivisionNo(3)}>
                    <h3>PAC</h3>
                </div>
            </div>
            <div className = 'Standings-Table'>
            {/* <table>
                <tr className = 'Standings-Row'>
                    <th>Rank</th>
                    <th>Team</th>
                    <th>GP</th>
                    <th>W</th>
                    <th>L</th>
                    <th>OT</th>
                    <th>PTS</th>
                    <th>Streak</th>
                </tr>

                {divisionArr.map((d)=>(
                    <tr key = {d.team.id}className = 'Standings-Row'>
                        <td>{d.divisionRank}</td>
                        <td>{d.team.name}</td>
                        <td>{d.gamesPlayed}</td>
                        <td>{d.leagueRecord.wins}</td>
                        <td>{d.leagueRecord.losses}</td>
                        <td>{d.leagueRecord.ot}</td>
                        <td>{d.points}</td>
                        <td>{d.streak.streakCode}</td>
                    </tr>
                ))}
            </table> */}
                    <div className = 'Standings-Row'>
                    <div className = 'Standings-Data-Title'><span>Rank</span></div>
                    <div className = 'Standings-Data-Team-Title'><span>Team</span></div>
                    <div className = 'Standings-Data-Title'><span>GP</span></div>
                    <div className = 'Standings-Data-Title'><span>W</span></div>
                    <div className = 'Standings-Data-Title'><span>L</span></div>
                    <div className = 'Standings-Data-Title'><span>OT</span></div>
                    <div className = 'Standings-Data-Title'><span>PTS</span></div>
                    <div className = 'Standings-Data-Title'><span>Streak</span></div>
                    </div>
            

                {divisionArr.map((d)=>(
                    
                    <div key = {d.team.id} className = 'Standings-Row'>
                    <div className = 'Standings-Data'><span>{d.divisionRank}</span></div>
                    <div className = 'Standings-Data-Team'><span>{d.team.name}</span></div>
                    <div className = 'Standings-Data'><span>{d.gamesPlayed}</span></div>
                    <div className = 'Standings-Data'><span>{d.leagueRecord.wins}</span></div>
                    <div className = 'Standings-Data'><span>{d.leagueRecord.losses}</span></div>
                    <div className = 'Standings-Data'><span>{d.leagueRecord.ot}</span></div>
                    <div className = 'Standings-Data'><span>{d.points}</span></div>
                    <div className = 'Standings-Data'><span>{d.streak.streakCode}</span></div>
                    </div>
                //     <li key = {d.team.id} className = 'Standings-Row'>
                //     <span>{d.divisionRank}</span>
                //     <span>{d.team.name}</span>
                //     <span>{d.gamesPlayed}</span>
                //     <span>{d.leagueRecord.wins}</span>
                //     <span>{d.leagueRecord.losses}</span>
                //     <span>{d.leagueRecord.ot}</span>
                //     <span>{d.points}</span>
                //     <span>{d.streak.streakCode}</span>
                // </li>
                ))}
            
            </div>
            <div className = 'Legend'>
                <div className = 'Legend-Title'>
                    <h4>Legend</h4>
                </div>
                <div className = 'Legend-Description'>
                    <div className = 'Legend-Acronym'>
                        <p>GP</p>
                        <p>W</p>
                        <p>L</p>
                        <p>OT</p>
                        <p>PTS</p>
                        <p>Streak</p>
                    </div>
                    <div className = 'Legend-Acronym-Description'>
                        <p>Games Played</p>
                        <p>Wins (Worth 2 points)</p>
                        <p>Losses (Worth 0 points)</p>
                        <p> Overtime Losses (Worth 1 point)</p>
                        <p>Points</p>
                        <p>W/L (Win/Loss) #(Length of streak)</p>
                    </div>
                    
                </div>
                    
                    
            </div>
        </div>
    );
}

export default TeamStandings;