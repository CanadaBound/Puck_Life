import { useState } from 'react';

import '../CSS/LandingPage.css';

import LeagueLeaders from './LeagueLeaders';
import NavBar from './NavBar';
import TeamSelector from './TeamSelector';
import TeamStandings from './TeamStandings';

function LandingPage({theme, setTheme}) {

const [teamSelected, setTeamSelected] = useState(false);
const [listOfTeams, setListOfTeams] = useState([]);


  return (
    <>
     {/* <div className = 'Landing-Page-Container'></div> */}
        <NavBar theme = {theme} setTheme = {setTheme}/>
        <main className = 'Stats-Standings-Container'>
          <nav className = 'Team-Select-Container'>
            <TeamSelector toggleStats = {setTeamSelected} setListTeams = {setListOfTeams}/>
          </nav>
            <article className = 'Stats-Container'> 
                <LeagueLeaders showStats = {teamSelected} getListTeams = {listOfTeams} theme = {theme}/>
             </article>
            <article className = 'Standings-Container'>
                <TeamStandings/>
            </article>
        </main>
        
    </>
    
    
  );
}

export default LandingPage;
