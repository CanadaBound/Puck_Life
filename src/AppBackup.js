import logo from './logo.svg';
import './App.css';
import SearchBar from './Components/SearchBar';
import HomePageArrow from './Components/HomePageArrow';
import SearchTeams from './Components/SearchTeams';

function App() {
  return (
    <div className="App">
      <div className="HomePageLayout">
        <div className = "HomePageLogo">
          <h1>The Locker Room</h1>
        </div>
        <div className = "HomePageDesc">
          <h2>Type in a players name or team to get started!</h2>
        </div>
        
        <HomePageArrow/>
        <SearchBar/>
       
      </div>
      
    </div>
  );
}

export default App;