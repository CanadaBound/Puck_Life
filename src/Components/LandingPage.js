import { useState } from 'react';

import '../CSS/LandingPage.css';

import LeagueLeaders from './LeagueLeaders';
import NavBar from './NavBar';
import TeamSelector from './TeamSelector';
import TeamStandings from './TeamStandings';

function LandingPage() {

const [teamSelected, setTeamSelected] = useState(false);
const [listOfTeams, setListOfTeams] = useState([]);


  return (

    <div className = 'Landing-Page-Container'>
        <NavBar/>
        <div className = 'Stats-Standings-Container'>
          <div className = 'Team-Select-Container'>
            <TeamSelector toggleStats = {setTeamSelected} setListTeams = {setListOfTeams}/>
          </div>
            <div className = 'Stats-Container'> 
                <LeagueLeaders showStats = {teamSelected} getListTeams = {listOfTeams} />
             </div>
            <div className = 'Standings-Container'>
                <TeamStandings/>
            </div>
        </div>
        
    </div>
    
  );
}

export default LandingPage;
