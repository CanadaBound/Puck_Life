import axios from "axios";
import { useState, useEffect } from "react";
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import '../CSS/SearchResult.css';

function SearchTeams({teamName, TeamID, setPlayer, setLink, toggleCard, setJersey}){
    var [teamArr, setTeamArr] = useState([]);
    
    useEffect(()=>{
      const axios = require('axios');
      var url = `https://statsapi.web.nhl.com/api/v1/teams/${TeamID}/roster`
      axios.get(url).then(res => {
        
        setTeamArr(res.data.roster);
    
    });
  }, []);

  function handleClick(name, link, jerseyNumber){
      setPlayer(name);
      setLink(link);
      setJersey(jerseyNumber);
      toggleCard(true);
  }
    
    
    
   
    return (
            <>
               <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
     <ListSubheader><p className = "ListHeader">{teamName}</p></ListSubheader>
          <ul>
          {teamArr.sort((a, b) => a.person.fullName.localeCompare(b.person.fullName)).map(d => 
            <ListItem key={d.person.id} onMouseDown={() => handleClick(d.person.fullName, d.person.link, d.jerseyNumber)}>
                <ListItemText primary={d.person.fullName} />
              </ListItem>
            )}

           
              
            
          </ul>
        
      
    </List>

                 
            </>
        );
                
   
   
}
export default SearchTeams;
