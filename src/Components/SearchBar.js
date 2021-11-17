import { useState, useEffect } from "react";
import axios from "axios";
import '../CSS/HomePage.css';
import List from "@mui/material/List";
import ListItem, { listItemClasses } from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';


function SearchBar({showPlayerSearch, displayCard, teamName, teamID, toggleTeamSearch, toggleDivCard}) {
  var [teamsArray, setTeamsArray] = useState([[]]);
  var [filteredTeamsArray, setFilteredTeamsArray] = useState([[]]);


  var [focused, setFocused] = useState(false);
  
  
  function onFocus(){
    setFocused(true);
    showPlayerSearch(false);
    displayCard(false);
    toggleDivCard(false);
  }
  function onBlur(){
    setFocused(false);
    toggleDivCard(true);
  }

  function handleClick(id, name){
    teamName(name)
    teamID(id);
    showPlayerSearch(true);
    toggleTeamSearch(false);
  }


  useEffect(() => {
    axios.get('https://statsapi.web.nhl.com/api/v1/teams').then(res => { 
      setTeamsArray(res.data.teams);
      setFilteredTeamsArray(res.data.teams); 
    });
  }, []);
 
 
    

return (
  
    
     <div className = "inputDiv">
     <form>
   <input 
   className="inputValueBar" 
   type="text" 
   defaultValue= ''
   placeholder="Type to filter" 
   onChange={e => setFilteredTeamsArray(teamsArray.filter(d => d.name.toLowerCase().includes(e.target.value.toLowerCase())))}
   onFocus = {onFocus}
   onBlur = {onBlur}/>

    {focused ? (
      <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        '& ul': { padding: 0 },
        [`& .active, & .${listItemClasses.root}:hover`]: {
          bgcolor: '#9c9c9c'
          }
      }}>
     {filteredTeamsArray.sort((a, b) => a.name.localeCompare(b.name)).map(d => (
      <ListItem key={d.id} id={d.id} onMouseDown={() => handleClick(d.id, d.name)}>
      <ListItemText primary ={d.name} >
        
      </ListItemText>
          
        
        </ListItem>
     ))}
     </List> 
     ) : null}
 
 </form>
   
    
    
     </div>
    
    
    );
    }


  
  
  export default SearchBar;