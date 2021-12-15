import { useState } from 'react';
import '../CSS/LandingPage.css';
import Instruction from './Instruction';
import LeagueLeaders from './LeagueLeaders';
import NavBar from './NavBar';
import TeamSelector from './TeamSelector';
import TeamStandings from './TeamStandings';

function LandingPage({theme, setTheme}) {

const [teamSelected, setTeamSelected] = useState(false);
const [listOfTeams, setListOfTeams] = useState([]);


  return (

    <div className = 'Landing-Page-Container'>
        <NavBar theme = {theme} setTheme = {setTheme}/>
        <div className = 'Stats-Standings-Container'>
          <div className = 'Team-Select-Container'>
            <TeamSelector toggleStats = {setTeamSelected} setListTeams = {setListOfTeams}/>
          </div>
            <div className = 'Stats-Container'> 
                <LeagueLeaders showStats = {teamSelected} getListTeams = {listOfTeams} theme = {theme}/>
             </div>
            <div className = 'Standings-Container'>
                <TeamStandings/>
            </div>
        </div>
        
    </div>
    
  );
}

export default LandingPage;
