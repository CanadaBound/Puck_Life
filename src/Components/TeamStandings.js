import '../CSS/TeamStandings.css';

import { useState, useEffect } from "react";
import { GetTeamStandings } from './APIInteractionFunctions';


function TeamStandings(){

    var [divisionNo, setDivisionNo] = useState(0);
    var [divisionArr, setDivisionArr] = useState([]);
    var [cssCentral, setCSSCentral] = useState('Central');
    var [cssAtlantic, setCSSAtlantic] = useState('Atlantic');
    var [cssMetropolitan, setCSSMetropolitan] = useState('Metropolitan-Active');
    var [cssPacific, setCSSPacific] = useState('Pacific');

    //Loads the standings data for the current selected division. (0 = Metropolitan, 1 = Atlantic, 2 = Central, 3 = Pacific)
    useEffect(()=>{
        GetTeamStandings().then(res=>{
            setDivisionArr(res.data.records[divisionNo].teamRecords);
        })
    }, [divisionNo]); 

    //When the division number selected changes we set that specific division to active and deactivate the rest.
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
            <div tabIndex = {0} className = 'Division-Container'>
                <div tabIndex = {0} id = {0} className = {cssMetropolitan} onKeyDown = {()=> setDivisionNo(0)} onClick = {()=> setDivisionNo(0)}>
                    <h3>MET</h3>
                </div>
                <div tabIndex = {0} id = {1} className = {cssAtlantic} onKeyDown = {()=> setDivisionNo(1)} onClick = {()=> setDivisionNo(1)}>
                    <h3>ATL</h3>
                </div>
                <div tabIndex = {0} id = {2} className = {cssCentral} onKeyDown = {()=> setDivisionNo(2)} onClick = {()=> setDivisionNo(2)}>
                    <h3>CEN</h3>
                </div>
                <div tabIndex = {0} id = {3} className = {cssPacific} onKeyDown = {()=> setDivisionNo(3)} onClick = {()=> setDivisionNo(3)}>
                    <h3>PAC</h3>
                </div>
            </div>
            <div className = 'Standings-Table'>
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