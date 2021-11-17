import { useState } from 'react/cjs/react.development';
import '../CSS/Home.css';
import CardLayout from './CardLayout';
import HomePageArrow from './HomePageArrow';
import SearchBar from './SearchBar';
import SearchTeams from './SearchTeams';
import HockeyTemplate from '../Assets/HockeyTemplate.png'
import PlayerDetails from './PlayerDetails';

function Homepage() {

  var [showSearch, setShowSearch] = useState(false);
  var [showCard, setShowCard] = useState(false);
  var [showName, setShowName] = useState('');
  var [showPlayer, setShowPlayer] = useState('');
  var [playerLink, setPlayerLink] = useState('');
  var [playerNumber, setPlayerNumber] = useState('');
  var [teamID, setTeamID] = useState('');

  return (
    <div className="HomepageLayout">
    {(showCard ?  <div className = "DataContent">
          
            <PlayerDetails player = {showPlayer} team = {showName} jersey = {playerNumber}/>
          
      </div>: null)}
      <div className = "SearchContent">
          <div className = "SearchDescription">
                <h2>Type in a players name or team to get started!</h2>
                <HomePageArrow/>
          </div>
          <div className = "SearchBar">
                <SearchBar showSearch = {setShowSearch} displayCard = {setShowCard} teamName = {setShowName} teamID = {setTeamID}/>
          </div>
          {(showSearch ?  <div className = "SearchResults">
              <SearchTeams teamName = {showName} TeamID = {teamID} setPlayer = {setShowPlayer} setLink = {setPlayerLink} toggleCard = {setShowCard} setJersey = {setPlayerNumber}/> 
          </div>: null)}
      </div>
    </div>
  );
}

export default Homepage;
