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
            <header className = 'Team-Standings-Title'>
                <h1 className = 'H1-TeamStandings'> Team Standings</h1>
            </header>
            <nav tabIndex = {0} className = 'Division-Container'>
                <button tabIndex = {0} id = {0} className = {cssMetropolitan} onKeyDown = {()=> setDivisionNo(0)} onClick = {()=> setDivisionNo(0)}>
                    <h2>MET</h2>
                </button>
                <button tabIndex = {0} id = {1} className = {cssAtlantic} onKeyDown = {()=> setDivisionNo(1)} onClick = {()=> setDivisionNo(1)}>
                    <h2>ATL</h2>
                </button>
                <button tabIndex = {0} id = {2} className = {cssCentral} onKeyDown = {()=> setDivisionNo(2)} onClick = {()=> setDivisionNo(2)}>
                    <h2>CEN</h2>
                </button>
                <button tabIndex = {0} id = {3} className = {cssPacific} onKeyDown = {()=> setDivisionNo(3)} onClick = {()=> setDivisionNo(3)}>
                    <h2>PAC</h2>
                </button>
            </nav>
            <section className = 'Standings-Table'>
                    <header className = 'Standings-Row'>
                        <div className = 'Standings-Data-Title'><h3>Rank</h3></div>
                        <div className = 'Standings-Data-Team-Title'><h3>Team</h3></div>
                        <div className = 'Standings-Data-Title'><h3>GP</h3></div>
                        <div className = 'Standings-Data-Title'><h3>W</h3></div>
                        <div className = 'Standings-Data-Title'><h3>L</h3></div>
                        <div className = 'Standings-Data-Title'><h3>OT</h3></div>
                        <div className = 'Standings-Data-Title'><h3>PTS</h3></div>
                        <div className = 'Standings-Data-Title'><h3>Streak</h3></div>
                    </header>
            

                {divisionArr.map((d)=>(
                    
                    <section key = {d.team.id} className = 'Standings-Row'>
                        <div className = 'Standings-Data'><p>{d.divisionRank}</p></div>
                        <div className = 'Standings-Data-Team'><p>{d.team.name}</p></div>
                        <div className = 'Standings-Data'><p>{d.gamesPlayed}</p></div>
                        <div className = 'Standings-Data'><p>{d.leagueRecord.wins}</p></div>
                        <div className = 'Standings-Data'><p>{d.leagueRecord.losses}</p></div>
                        <div className = 'Standings-Data'><p>{d.leagueRecord.ot}</p></div>
                        <div className = 'Standings-Data'><p>{d.points}</p></div>
                        <div className = 'Standings-Data'><p>{d.streak.streakCode}</p></div>
                    </section>
            
                ))}
            
            </section>
            <section className = 'Legend'>
                <header className = 'Legend-Title'>
                    <h3>Legend</h3>
                </header>
                <section className = 'Legend-Description'>
                    <section className = 'Legend-Acronym'>
                        <p>GP</p>
                        <p>W</p>
                        <p>L</p>
                        <p>OT</p>
                        <p>PTS</p>
                        <p>Streak</p>
                    </section>
                    <section className = 'Legend-Acronym-Description'>
                        <p>Games Played</p>
                        <p>Wins (Worth 2 points)</p>
                        <p>Losses (Worth 0 points)</p>
                        <p> Overtime Losses (Worth 1 point)</p>
                        <p>Points</p>
                        <p>W/L (Win/Loss) #(Length of streak)</p>
                    </section>
                    
                </section>
                    
                    
            </section>
        </div>
    );
}

export default TeamStandings;