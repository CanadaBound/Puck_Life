import { useState } from 'react/cjs/react.development';
import '../CSS/Home.css';
import CardLayout from './CardLayout';
import HomePageArrow from './HomePageArrow';
import SearchBar from './SearchBar';
import SearchTeams from './SearchTeams';
import HockeyTemplate from '../Assets/HockeyTemplate.png'
import PlayerDetails from './PlayerDetails';
import DivisionCardLayout from './DivisionCardLayout';
import TeamCardLayout from './TeamCardLayout';

function Homepage() {

  var [showPlayerSearch, setShowPlayerSearch] = useState(false);
  var [showTeamSearch, setShowTeamSearch] = useState(true);
  var [showCard, setShowCard] = useState(false);
  var [showTeamCard, setShowTeamCard] = useState(false);
  var [showDivisionCard, setShowDivisionCard] = useState(true);
  var [showName, setShowName] = useState('');
  var [showPlayer, setShowPlayer] = useState('');
  var [playerLink, setPlayerLink] = useState('');
  var [playerNumber, setPlayerNumber] = useState('');
  var [teamID, setTeamID] = useState('');



  return (
    <div className="HomepageLayout">
      <div className = "DataContent">
        {(showDivisionCard ? <DivisionCardLayout/> : null)}
         {(showCard ? 
            <PlayerDetails player = {showPlayer} team = {showName} jersey = {playerNumber}/>
          : null)}

          {(showTeamCard ? <TeamCardLayout teamName = {showName} teamStatsID = {teamID}/> : null)}
      </div>
      <div className = "SearchContent">
          <div className = "SearchDescription">
                <h2>Type in a players name or team to get started!</h2>
                <HomePageArrow/>
          </div>
          <div className = "SearchBar">
                {showTeamSearch ? <SearchBar toggleTeamCard = {setShowTeamCard} showPlayerSearch = {setShowPlayerSearch} displayCard = {setShowCard} teamName = {setShowName} teamID = {setTeamID} toggleTeamSearch = {setShowTeamSearch} toggleDivCard = {setShowDivisionCard}/> : null}
                {(showPlayerSearch ?  <div className = "SearchResults">
              
              <SearchTeams
              toggleTeamCard = {setShowTeamCard} 
              toggleDivCard = {setShowDivisionCard}
              teamName = {showName} 
              TeamID = {teamID} 
              setPlayer = {setShowPlayer} 
              setLink = {setPlayerLink} 
              toggleCard = {setShowCard}
              setJersey = {setPlayerNumber} 
              toggleTeamSearch = {setShowTeamSearch} 
              togglePlayerSearch = {setShowPlayerSearch} />

          </div>: null)}
          </div>
          
      </div>
    </div>
  );
}

export default Homepage;
