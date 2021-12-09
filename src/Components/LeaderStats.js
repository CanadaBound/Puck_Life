import { useEffect, useState, useRef } from "react";
import '../CSS/LeaderStats.css';
import teamDetail from "../Assets/teamDetail";
import axios from "axios";
import { FaThermometerThreeQuarters } from "react-icons/fa";

function LeaderStats({playerPos, teams, statSelect}){
const isInitialMount = useRef(true);

var [listOfStats, setListOfStats] = useState([]);
var [selectedPlayer, setSelectedPlayer] = useState({TeamID: '0', TeamName: 'Test Team', ID: '12345', Name: 'Bobby Bobson', First: 'Bobby', Last: 'Bobson', JerseyNo: '99', PositionCode: 'C', Points: '0', Goals: '0', Assists: '0'});
var [selectedGoalie, setSelectedGoalie] = useState({TeamID: '0', TeamName: 'Test Team', ID: '12345', Name: 'Bobby Bobson', First: 'Bobby', Last: 'Bobson', JerseyNo: '99', PositionCode: 'G', GAA: '2.124', SavePercentage: '0.999', Shutouts: '10'});
var [playerURL, setPlayerURL] = useState('https://via.placeholder.com/150');
var [triggerStats, setTriggerStats] = useState(false);
var [showIndividualStats, setShowIndividualStats] = useState(false);
var [isDesktop, setIsDesktop] = useState(true);
const InactiveClass = 'Player-Stats-Row';
const ActiveClass = 'Player-Stats-Row-Active';

var liRef = useRef();
var [refVal, setRefVal] = useState(null);
var ulRef = useRef(null);

useEffect(()=>{
  if(navigator.maxTouchPoints>0){
    setIsDesktop(false);
  }
}, [])

useEffect(()=>{
  
    if(refVal !== null && liRef.current !== refVal){
     
      liRef.current.style.fontWeight = '400';
      liRef.current = refVal;
      liRef.current.style.fontWeight = '700'
    
    }
  
}, [refVal])

//If it's not the first render and the listOfStats state has changed it will render the stats of the players
useEffect(()=>{
  if(!isInitialMount.current){
    
    
    if(listOfStats.length !== 0){
      loadTopPlayer();
    }
    setTriggerStats(true);
    
    

  }
  
}, [listOfStats])

//When teams prop changes, run the function to get player data from API
useEffect(()=>{

  if (isInitialMount.current) {
    isInitialMount.current = false;
 }else{
  if(teams.length !== 0){
    getPlayerIDs(teams);
    if(listOfStats.length !== 0){
      loadTopPlayer();
    }
  }else{
    
    setTriggerStats(false);
    
  }
}
},[teams])

useEffect(()=>{

  if (isInitialMount.current) {
    isInitialMount.current = false;
 }else{
  if(teams.length !== 0){
   
    getPlayerIDs(teams);
    if(listOfStats.length !== 0){
      loadTopPlayer();
    }
  }else{
    
    setTriggerStats(false);
  }
}
},[playerPos])

function getPlayerIDs(teamID){

  const axios = require('axios');
  setListOfStats([]);
  var tempObj;

  teamID.forEach(d => 
    
    axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${parseInt(d)}/roster`).then(res => {
    
    //If user has selected the forward position filter roster by that player position and get the stats and save to temp array.
    if(playerPos === 0){
      res.data.roster.filter(obj => obj.position.type === 'Forward').map(e=> 
        axios.get(`https://statsapi.web.nhl.com/api/v1/people/${e.person.id}/stats?stats=statsSingleSeason&season=20212022`).then(res =>{
          if(typeof res.data.stats[0].splits[0] !== 'undefined'){
           
              var splitArr = e.person.fullName.split(' ');
              var teamName =  teamDetail.find(a=> parseInt(a.ID) === parseInt(d));
              tempObj = { TeamID: `${d}`,TeamName: teamName.Name, ID: `${e.person.id}`, Name: `${e.person.fullName}`, First: splitArr[0], Last: splitArr[1] ,PositionCode: `${e.position.code}`, JerseyNo: `${e.jerseyNumber}`, Points: `${res.data.stats[0].splits[0].stat.points}`, Goals: `${res.data.stats[0].splits[0].stat.goals}`, Assists: `${res.data.stats[0].splits[0].stat.assists}`};
              
              setListOfStats(listOfStats => [...listOfStats, tempObj]);
          
          }

        })
      );

    }
    //If user has selected the goalie position filter roster by that player position and get the stats and save to temp array.

    else if(playerPos === 1){
      res.data.roster.filter(obj => obj.position.type === 'Goalie').map(e=> 
        axios.get(`https://statsapi.web.nhl.com/api/v1/people/${e.person.id}/stats?stats=statsSingleSeason&season=20212022`).then(res =>{
          if(typeof res.data.stats[0].splits[0] !== 'undefined' && res.data.stats[0].splits[0].stat.games > 3){
            
              var splitArr = e.person.fullName.split(' ');
              var teamName =  teamDetail.find(a=> parseInt(a.ID) === parseInt(d));
              tempObj = { TeamID: `${d}`,TeamName: teamName.Name, ID: `${e.person.id}`, Name: `${e.person.fullName}`, First: splitArr[0], Last: splitArr[1] ,PositionCode: `${e.position.code}`, JerseyNo: `${e.jerseyNumber}`, GAA: `${res.data.stats[0].splits[0].stat.goalAgainstAverage}`, SavePercentage: `${res.data.stats[0].splits[0].stat.savePercentage}`, Shutouts: `${res.data.stats[0].splits[0].stat.shutouts}`};
              
              setListOfStats(listOfStats => [...listOfStats, tempObj]);
;
            
          }

        })
      );
    }
    //If user has selected the defense position filter roster by that player position and get the stats and save to temp array.

    else if(playerPos === 2){
      res.data.roster.filter(obj => obj.position.type === 'Defenseman').map(e=> 
        axios.get(`https://statsapi.web.nhl.com/api/v1/people/${e.person.id}/stats?stats=statsSingleSeason&season=20212022`).then(res =>{
          if(typeof res.data.stats[0].splits[0] !== 'undefined'){
           
              var splitArr = e.person.fullName.split(' ');
              var teamName =  teamDetail.find(a=> parseInt(a.ID) === parseInt(d));
              tempObj = {TeamID: `${d}`, TeamName: teamName.Name, ID: `${e.person.id}`, Name: `${e.person.fullName}`,First: splitArr[0], Last: splitArr[1] ,PositionCode: `${e.position.code}`, JerseyNo: `${e.jerseyNumber}` ,Points: `${res.data.stats[0].splits[0].stat.points}`, Goals: `${res.data.stats[0].splits[0].stat.goals}`, Assists: `${res.data.stats[0].splits[0].stat.assists}`};
              setListOfStats(listOfStats => [...listOfStats, tempObj]);

            
          }

        })
      );
    }
    
    })
  );

  
}

function hoverOverPlayer(e){
  
  setRefVal(e.currentTarget);

  e.currentTarget.style.fontWeight = '700';
  
  setShowIndividualStats(true);
  if(playerPos !== 1){
    var statsObj = listOfStats.find(x => x.ID === e.currentTarget.id);
    setSelectedPlayer(statsObj);
    axios.get(`https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${statsObj.Name}`).then(res =>{

  if(res.data.player!==null){
    if(res.data.player[0].strCutout !== null){
     
        setPlayerURL(res.data.player[0].strCutout);
      }else{
     
        setPlayerURL(res.data.player[0].strThumb);
      }
    }
  })
    
  }else{
    var goalieObj = listOfStats.find(x => x.ID === e.currentTarget.id);
    setSelectedGoalie(goalieObj);
    axios.get(`https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${goalieObj.Name}`).then(res =>{
      if(res.data.player!==null){
        if(res.data.player[0].strCutout !== null){
          
            setPlayerURL(res.data.player[0].strCutout);
          }else{
            setPlayerURL(res.data.player[0].strThumb);
          
          }
        }
    })
  }
  
  
}

function loadTopPlayer(){
  
  var tempArr = [];
  if(triggerStats){
    switch(statSelect){
      case 1:
        if(playerPos!== 1){
          tempArr = [...listOfStats];
          tempArr = tempArr.sort((a,b) => b.Points - a.Points ).splice(0,1);
          setSelectedPlayer(tempArr[0]);
          
    }
  
        else {
          tempArr = [...listOfStats];
          tempArr = tempArr.sort((a,b) => a.GAA - b.GAA ).slice(0,1);
          setSelectedGoalie(tempArr[0]);
        }
        
      break;
      case 2:
        if(playerPos!== 1){
          tempArr = [...listOfStats];
          tempArr = tempArr.sort((a,b) => b.Goals - a.Goals ).slice(0,1);
          setSelectedPlayer(tempArr[0]);
        }else {
          tempArr = [...listOfStats];
          tempArr = tempArr.sort((a,b) => b.SavePercentage - a.SavePercentage ).slice(0,1);
          setSelectedGoalie(tempArr[0]);
        }
      break;
      case 3:
        if(playerPos!== 1){
          tempArr = [...listOfStats];
          tempArr = tempArr.sort((a,b) => b.Assists - a.Assists ).slice(0,1);
          setSelectedPlayer(tempArr[0]);
        }else {
          tempArr = [...listOfStats];
          tempArr = tempArr.sort((a,b) => b.Shutouts - a.Shutouts ).slice(0,1);
          setSelectedGoalie(tempArr[0]);
        }
      break;
      default:
    }

    axios.get(`https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${tempArr[0].Name}`).then(res =>{
            if(res.data.player!==null){
              if(res.data.player[0].strCutout !== null){
               
                setPlayerURL(res.data.player[0].strCutout);
              }else if(res.data.player[0].strThumb !== null){
                setPlayerURL(res.data.player[0].strThumb);
                
              }else{
                setPlayerURL('https://via.placeholder.com/150');
              }
        }
      });
    
  }
}


function handleMouseLeave(){
  setRefVal(ulRef.current.firstChild);
  loadTopPlayer();
}

useEffect(()=>{
  handleMouseLeave();
}, [statSelect])





if(playerPos !== 1){
    return(

  <div onMouseLeave = {()=> handleMouseLeave()} className = 'Player-Stats'>
   <div className = 'Individual-Stats-Container' >

      <div className = 'Individual-Picture-Container' >
        
        <img className = 'Picture-Tag' alt = 'Hockey player' src = {playerURL}></img>
      
      </div>
      <div className = 'Individual-Name-Container'>
        <div className = 'Jersey-Number-Container'>
          <p className = 'Jersey-Number'> #{selectedPlayer.JerseyNo}</p>
        </div>
        <div className = 'Player-Name-Container'>
          <span>{selectedPlayer.First}</span>
          <span>{selectedPlayer.Last}</span>
        </div>
      
      </div>
      <div className = 'Individual-Team-Name-Container'>
        <div className = 'Team-Name-Container'>
          <p className = 'Team-Name'>{selectedPlayer.TeamName}</p>
        </div>
        <div className = 'Position-Container'>
          <p className = 'Position'>{selectedPlayer.PositionCode}</p>
        </div>
      </div>
      <div className = 'Individual-Value-Container'>
        {statSelect === 1 && 
        <div className='Stat-Container'>
          <span className = 'Stat-Type'>Points</span>
          <span className = 'Stat-Value'>{selectedPlayer.Points}</span>
        </div>}
        {statSelect === 2 && 
        <div className='Stat-Container'>
          <span className = 'Stat-Type'>Goals</span>
          <span className = 'Stat-Value'>{selectedPlayer.Goals}</span>
        </div>}
        {statSelect === 3 && 
        <div className='Stat-Container'>
          <span className = 'Stat-Type'>Assists</span>
          <span className = 'Stat-Value'>{selectedPlayer.Assists}</span>
        </div>}
      </div>
    </div>
    <div className = 'Total-Stats-Container'>
      <ul ref = {ulRef} className = 'Player-Stats-Table'>
      {triggerStats && statSelect === 1? listOfStats.sort((a,b) => b.Points - a.Points ).slice(0,10).map((d, index)=>{
  
        return <li tabIndex = {0} ref = {liRef} onKeyDown = {(e)=>hoverOverPlayer(e)} onClick = {(e)=>hoverOverPlayer(e)} onMouseEnter={(e)=>hoverOverPlayer(e)} className = {index===0 && isDesktop?ActiveClass:InactiveClass} id = {d.ID} key = {d.ID}>
          
          <span className = 'Name'>{d.First}</span>
          <span className = 'Name'>{d.Last}</span>
          <span className = 'Stat'>{d.Points}</span>
        </li>
        
        
      } 
      ): null}
      {triggerStats && statSelect === 2? listOfStats.sort((a,b) => b.Goals - a.Goals ).slice(0,10).map((d, index)=>{
        
        return <li tabIndex = {0} ref = {liRef} onKeyDown = {(e)=>hoverOverPlayer(e)} onMouseEnter={(e)=>hoverOverPlayer(e)} onClick =  {(e)=>hoverOverPlayer(e)} className = {index===0 && isDesktop?ActiveClass:InactiveClass} id = {d.ID} key = {d.ID}>
          <span className = 'Name'>{d.First}</span>
          <span className = 'Name'>{d.Last}</span>
          <span className = 'Stat'>{d.Goals}</span>
        </li>}
      ) : null}
      {triggerStats && statSelect === 3? listOfStats.sort((a,b) => b.Assists - a.Assists ).slice(0,10).map((d, index)=>{
        
        return <li tabIndex = {0} ref = {liRef} onKeyDown = {(e)=>hoverOverPlayer(e)} onMouseEnter={(e)=>hoverOverPlayer(e)} onClick =  {(e)=>hoverOverPlayer(e)} className = {index===0 && isDesktop?ActiveClass:InactiveClass} id = {d.ID} key = {d.ID}>
          <span className = 'Name'>{d.First}</span>
          <span className = 'Name'>{d.Last}</span>
          <span className = 'Stat'>{d.Assists}</span>
        </li>}
      ) : null}
      </ul>
    </div>
  </div>
    )
  }else{
    return(

      <div onMouseLeave = {()=> handleMouseLeave()} className = 'Player-Stats'>
        <div className = 'Individual-Stats-Container' >
    
          <div className = 'Individual-Picture-Container' >
          <div className = "Picture"/>
        <img className = 'Picture-Tag' alt = 'Hockey player' src = {playerURL}></img>
      </div>
    
          <div className = 'Individual-Name-Container'>
            <div className = 'Jersey-Number-Container'>
              <p className = 'Jersey-Number'> #{selectedGoalie.JerseyNo}</p>
            </div>
            <div className = 'Player-Name-Container'>
              <span>{selectedGoalie.First}</span>
              <span>{selectedGoalie.Last}</span>
            </div>
          
          </div>
          <div className = 'Individual-Team-Name-Container'>
            <div className = 'Team-Name-Container'>
              <p className = 'Team-Name'>{selectedGoalie.TeamName}</p>
            </div>
            <div className = 'Position-Container'>
              <p className = 'Position'>{selectedGoalie.PositionCode}</p>
            </div>
          </div>
          <div className = 'Individual-Value-Container'>
            {statSelect === 1 && 
            <div className='Stat-Container'>
              <span className = 'Stat-Type'>GAA</span>
              <span className = 'Stat-Value'>{parseInt(selectedGoalie.GAA).toFixed(2)}</span>
            </div>}
            {statSelect === 2 && 
            <div className='Stat-Container'>
              <span className = 'Stat-Type'>SV%</span>
              <span className = 'Stat-Value'>{selectedGoalie.SavePercentage}</span>
            </div>}
            {statSelect === 3 && 
            <div className='Stat-Container'>
              <span className = 'Stat-Type'>Shutouts</span>
              <span className = 'Stat-Value'>{selectedGoalie.Shutouts}</span>
            </div>}
          </div>
        </div>
        <div className = 'Total-Stats-Container'>
          <ul ref = {ulRef} className = 'Player-Stats-Table'>
          {triggerStats && statSelect === 1? listOfStats.sort((a,b) => a.GAA - b.GAA ).slice(0,10).map((d, index)=>{
            
            return <li tabIndex = {0} ref = {liRef} onKeyDown = {(e)=>hoverOverPlayer(e)} onMouseEnter={(e)=>hoverOverPlayer(e)} onClick =  {(e)=>hoverOverPlayer(e)} className = {index===0 && isDesktop?ActiveClass:InactiveClass} id = {d.ID} key = {d.ID}>
              <span className = 'Name'>{d.First}</span>
              <span className = 'Name'>{d.Last}</span>
              <span className = 'Stat'>{parseInt(d.GAA).toFixed(2)}</span>
            </li>}
          ) : null}
          {triggerStats && statSelect === 2? listOfStats.sort((a,b) => b.SavePercentage - a.SavePercentage ).slice(0,10).map((d, index)=>{
            
            return <li tabIndex = {0} ref = {liRef} onKeyDown = {(e)=>hoverOverPlayer(e)} onMouseEnter={(e)=>hoverOverPlayer(e)} onClick =  {(e)=>hoverOverPlayer(e)} className = {index===0 && isDesktop?ActiveClass:InactiveClass} id = {d.ID} key = {d.ID}>
              <span className = 'Name'>{d.First}</span>
              <span className = 'Name'>{d.Last}</span>
              <span className = 'Stat'>{d.SavePercentage}</span>
            </li>}
          ) : null}
          {triggerStats && statSelect === 3? listOfStats.sort((a,b) => b.Shutouts - a.Shutouts ).slice(0,10).map((d, index)=>{
            
            return <li tabIndex = {0} ref = {liRef} onKeyDown = {(e)=>hoverOverPlayer(e)} onMouseEnter={(e)=>hoverOverPlayer(e)} onClick =  {(e)=>hoverOverPlayer(e)} className = {index===0 && isDesktop?ActiveClass:InactiveClass} id = {d.ID} key = {d.ID}>
              <span className = 'Name'>{d.First}</span>
              <span className = 'Name'>{d.Last}</span>
              <span className = 'Stat'>{d.Shutouts}</span>
            </li>}
          ) : null}
          </ul>
        </div>
      </div>
        )
  }
  
}
export default LeaderStats;