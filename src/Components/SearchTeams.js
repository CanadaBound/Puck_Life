import axios from "axios";
import { useState, useEffect } from "react";
import * as React from 'react';
import List from '@mui/material/List';
import ListItem, { listItemClasses } from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import '../CSS/SearchResult.css';
import {AiFillCloseSquare} from 'react-icons/ai';

function SearchTeams({toggleDivCard, teamName, TeamID, setPlayer, setLink, toggleCard, setJersey, toggleTeamSearch, togglePlayerSearch, toggleTeam}){
    var [teamArr, setTeamArr] = useState([]);
    var [filteredTeamsArray, setFilteredTeamsArray] = useState([]);
    var [childBgColour, setChildBgColour] = useState(false);

    useEffect(()=>{
      const axios = require('axios');
      var url = `https://statsapi.web.nhl.com/api/v1/teams/${TeamID}/roster`
      axios.get(url).then(res => {
        
        setTeamArr(res.data.roster);
        setFilteredTeamsArray(res.data.roster);
    
    });
  }, []);

  function handleClick(name, link, jerseyNumber){
      setPlayer(name);
      setLink(link);
      setJersey(jerseyNumber);
      toggleCard(true);
  }
    
  function onBlur(){
    toggleCard(false);
  }

  

  function closeTeam(){
    toggleTeamSearch(true);
    togglePlayerSearch(false);
    toggleCard(false);
    toggleDivCard(true);
    
  }
    
   
    return (
            <div className ='PlayerListContainer'>
            <input 
   className="inputValueBar" 
   type="text" 
   defaultValue= ''
   placeholder="Type to filter" 
   onChange={e => setFilteredTeamsArray(teamArr.filter(d => d.person.fullName.toLowerCase().includes(e.target.value.toLowerCase())))}
   onBlur = {onBlur}/>

               <List
      sx={{
        width: '100%',
        height:'100%',
        maxWidth: 360,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        '& ul': { padding: 0 },
        [`& .active, & .${listItemClasses.root}:hover`]: {
          bgcolor: '#9c9c9c'
          }
        }
      }
      subheader={<li />}
    >
     <ListSubheader>

        <div className = "ListHeaderDiv">
          <p className = "ListHeader">{teamName}</p> 
          <AiFillCloseSquare size = {28} className = 'CloseTeam'onClick = {closeTeam}/>
        </div>
        
      </ListSubheader>
          <ul>
          {filteredTeamsArray.sort((a, b) => a.person.fullName.localeCompare(b.person.fullName)).map(d => 
            <ListItem key={d.person.id} onMouseDown={() => handleClick(d.person.fullName, d.person.link, d.jerseyNumber)} >
                <ListItemText style ={{color: '#000000'}} primary = {d.person.fullName}></ListItemText>
              </ListItem>
            )}

           
              
            
          </ul>
        
      
    </List>

                 
            </div>
        );
                
   
   
}
export default SearchTeams;
