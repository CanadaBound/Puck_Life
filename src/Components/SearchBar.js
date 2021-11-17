import { useState, useEffect } from "react";
import axios from "axios";
import '../CSS/HomePage.css';
import List from "@mui/material/List";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';


function SearchBar({showSearch, displayCard, teamName, teamID}) {
  var [teamsArray, setTeamsArray] = useState([[]]);
  var [filteredTeamsArray, setFilteredTeamsArray] = useState([[]]);


  var [focused, setFocused] = useState(false)
  function onFocus(){
    setFocused(true);
    showSearch(false);
    displayCard(false);
  }
  var onBlur = () => setFocused(false)

  function handleClick(id, name){
    teamName(name)
    teamID(id);
    showSearch(true);
   
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
   {/* <input 
   className="inputValueBar" 
   type="text" 
   defaultValue= ''
   placeholder="Type to filter" 
   onChange={e => setFilteredTeamsArray(teamsArray.filter(d => d.name.toLowerCase().includes(e.target.value.toLowerCase())))}
   onFocus = {onFocus}
   onBlur = {onBlur}/> */}

   <TextField label="Teams" color="secondary"  className="inputValueBar" onChange={e => setFilteredTeamsArray(teamsArray.filter(d => d.name.toLowerCase().includes(e.target.value.toLowerCase())))}
   onFocus = {onFocus} onBlur = {onBlur}/>


   
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
      }}>
     {filteredTeamsArray.sort((a, b) => a.name.localeCompare(b.name)).map(d => (
      <ListItem key={d.id} id={d.id} onMouseDown={() => handleClick(d.id, d.name)}>
        <ListItemText>
          {d.name}
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