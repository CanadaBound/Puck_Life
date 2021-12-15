import { useEffect, useState, useRef } from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";

import '../CSS/LeaderStats.css';

import teamDetail from "../Assets/teamDetail";
import {GetPlayerPhotos, SelectCorrectStats} from './APIInteractionFunctions.js';



function LeaderStats({playerPos, teams, statSelect}){
	const isInitialMount = useRef(true);
	const navigate = useNavigate();

	var [listOfStats, setListOfStats] = useState([]);
	var [selectedPlayer, setSelectedPlayer] = useState({TeamID: '0', TeamName: 'Test Team', ID: '12345', Name: 'Bobby Bobson', First: 'Bobby', Last: 'Bobson', JerseyNo: '99', PositionCode: 'C', Points: '0', Goals: '0', Assists: '0', GAA: '2.124', SavePercentage: '0.999', Shutouts: '10'});
	var [playerURL, setPlayerURL] = useState('https://via.placeholder.com/150');
	var [triggerStats, setTriggerStats] = useState(false);
	const InactiveClass = 'Player-Stats-Row';

	var liRef = useRef();
	var [refVal, setRefVal] = useState(null);
	var ulRef = useRef(null);

	//This useEffect runs the GetPlayerPhotos function which will fetch photos from the SportsDB API. The promise is then resolved
	//it checks if any of the data is null or undefined as the data isn't always available especially for newer players. If the 
	//player exists, it checks if a thumbnail exists as that's the preferred photo. If that's not available it looks for the cutout
	//and if that's not available it just sets a placeholder image. It does this if the player doesn't exist.
	useEffect(()=>{

  		GetPlayerPhotos(selectedPlayer.Name).then(res => {
			if(res.data.player!==null && res.data.player[0] !== null && res.data.player.length !== 0){
				if(res.data.player[0].strThumb !== null){
	   				setPlayerURL(res.data.player[0].strThumb);
				}else if(res.data.player[0].strCutout){
		  			setPlayerURL(res.data.player[0].strCutout);
				}else{
	   				setPlayerURL('https://via.placeholder.com/250');
				}		
  			}else{
	  			setPlayerURL('https://via.placeholder.com/250');
 			}
  		});
		toggleActive(selectedPlayer.ID);
	},[selectedPlayer]);

	//This useEffect sets the reference value set by the function to be the current <li> element reference.
	useEffect(()=>{
		if(refVal !== null && liRef.current !== null &&  liRef.current !== refVal){
			
				liRef.current = refVal;
				
			}
		
  
	}, [refVal])

	//This function will loop through the child nodes of <ul> and if the player currently selected is the same as the element
	// that it's currently looping through it will make the font bold otherwise it will turn it back to normal size.
	//This was designed like this so that on load we don't have mutliple bolded names as the elements don't necessarily load in the same
	//order as they are rendered so I can't guarantee that the first player that is loaded is the top player.
	function toggleActive(playerID){
		ulRef.current.childNodes.forEach(liElement =>{
			if(liElement.id === playerID){
				setRefVal(liElement.style.fontWeight = '700');
			}else{
				setRefVal(liElement.style.fontWeight = '400');
			}
		})
	}

	//This useEffect set's the current reference value of the li element to the first child in the ul element which resets
	// the 'active' element back to the top player on the list. Then selectedPlayer is set to the current top player.
	//Trigger stats is set to true to allow the list to render.
	useEffect(()=>{
		
  		if(!isInitialMount.current && listOfStats.length !== 0){
			
			setSelectedPlayer(SelectCorrectStats([...listOfStats], statSelect, playerPos));
		}
  
		setTriggerStats(true);
  
	}, [listOfStats, statSelect, playerPos])



	//In this useEffect, there is a state check for whether or not the render is the first one or not.
	//if it is, it sets the state to false and skips the rest of the operations.
	//If there is a team selected getPlayerIDs function is run, if the listOfStats state isn't 0
	//it once again sets the active name to bold and then sets the selected player stats.
	useEffect(()=>{

  		if (isInitialMount.current) {
			isInitialMount.current = false;
 		}else{
  			if(teams.length !== 0){
				
				getPlayerIDs(teams);
				if(listOfStats.length !== 0){
				
					setSelectedPlayer(SelectCorrectStats([...listOfStats], statSelect, playerPos));
				}
  			}else{
	
				setTriggerStats(false);
	
  			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[teams, playerPos])

	//This function queries the API with the selected teamID set when the user clicks on a logo. The resulting roster data is filtered by
	//the position that the user selected. For every instance of a player in that resulting array a query is made to the API which gets the current
	//seasons stats for the player. The function then checks if there's data present in the returned array as some players may not have data.
	//After that we form an object with all the required information in it for the website. We split the fullName into a first and last and we 
	//find the teamName by looking at the local object array 'teamDetail' as neither of the 2 previous queries contain their current team information.
	//The state is then update with the new player object and it joins any previously stored objects.
	function getPlayerIDs(teamID){
  
		setListOfStats([]);
		var tempObj;
  		var positions = ['Forward', 'Goalie', 'Defenseman'];
  		teamID.forEach(d => 
	
			axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${parseInt(d)}/roster`).then(res => {
	
	  			res.data.roster.filter(obj => obj.position.type === positions[playerPos]).map(e=> 
					axios.get(`https://statsapi.web.nhl.com/api/v1/people/${e.person.id}/stats?stats=statsSingleSeason&season=20212022`).then(res =>{
	
						if(typeof res.data.stats[0].splits[0] !== 'undefined'){
		   
							var splitArr = e.person.fullName.split(' ');
							var teamName =  teamDetail.find(a=> parseInt(a.ID) === parseInt(d));
							if(playerPos !== 1){
								tempObj = { TeamID: `${d}`,TeamName: teamName.Name, ID: `${e.person.id}`, Name: `${e.person.fullName}`, First: splitArr[0], Last: splitArr[1] ,PositionCode: `${e.position.code}`, JerseyNo: `${e.jerseyNumber}`, Points: `${res.data.stats[0].splits[0].stat.points}`, Goals: `${res.data.stats[0].splits[0].stat.goals}`, Assists: `${res.data.stats[0].splits[0].stat.assists}`, GAA: 'N/A', SavePercentage: 'N/A', Shutouts: 'N/A'};
							}else{
								tempObj = { TeamID: `${d}`,TeamName: teamName.Name, ID: `${e.person.id}`, Name: `${e.person.fullName}`, First: splitArr[0], Last: splitArr[1] ,PositionCode: `${e.position.code}`, JerseyNo: `${e.jerseyNumber}`, Points: 'N/A', Goals: 'N/A', Assists: 'N/A', GAA: `${res.data.stats[0].splits[0].stat.goalAgainstAverage}`, SavePercentage: `${res.data.stats[0].splits[0].stat.savePercentage}`, Shutouts: `${res.data.stats[0].splits[0].stat.shutouts}`};   
							}
	  
							setListOfStats(listOfStats => [...listOfStats, tempObj]);
						}

					})
	  			);

			})
  		);
	}

	//This function replicates the css :hover function, as :hover does not work well with mapped elements
	//We set the current referance value to the element that triggeref this hover to run and then we set the selected player info
	//using the ID stored in the li element.
	function hoverOverPlayer(e){
  
  		setRefVal(e.currentTarget);
  		setSelectedPlayer(listOfStats.find(x => x.ID === e.currentTarget.id));
	}

	//This function similarly replicates the :hover function but it triggers when you leave the main div containing the player data
	//once triggered it sets the li element reference to the first child in the ul element. This represents the top player. It then 
	// set the selected player state again using the helper function that selects data for the first user in the list.
	function handleMouseLeave(){
  		if(triggerStats){
			setSelectedPlayer(SelectCorrectStats([...listOfStats], statSelect, playerPos));
 		}
	}

	return(
	
	<div onMouseLeave = {()=> handleMouseLeave()} className = 'Player-Stats'>
		{/* This part displays the photo alongside a few stats when user hovers over a players name */}
		<div className = 'Individual-Stats-Container' >
			<div className = 'Individual-Picture-Container' >
				<img className = 'Picture-Tag' alt = 'Hockey player' src = {playerURL}></img>
	  		</div>
	  		<div className = 'Individual-Name-Container'>
				<div className = 'Jersey-Number-Container'>
		  			<p className = 'Jersey-Number'> #{selectedPlayer.JerseyNo}</p>
				</div>
				<div className = 'Player-Name-Container' onClick = {() => navigate(`/Player/${selectedPlayer.ID}`)}>
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
			  {/* This section decides what label/data to display based on the selected player position and the stat selected. */}
	  		<div className = 'Individual-Value-Container'>
				{statSelect === 1 && 
					<div className='Stat-Container'>
		  				{playerPos !== 1 ?<span className = 'Stat-Type'>Points</span> : <span className = 'Stat-Type'>GAA</span>}
		  				{playerPos !== 1 ?<span className = 'Stat-Value'>{selectedPlayer.Points}</span> : <span className = 'Stat-Value'>{parseInt(selectedPlayer.GAA).toFixed(2)}</span>}
					</div>}
				{statSelect === 2 && 
					<div className='Stat-Container'>
		  				{playerPos !== 1 ?<span className = 'Stat-Type'>Goals</span> : <span className = 'Stat-Type'>SV%</span>}
		  				{playerPos !== 1 ?<span className = 'Stat-Value'>{selectedPlayer.Goals}</span> : <span className = 'Stat-Value'>{selectedPlayer.SavePercentage}</span>}
					</div>}
				{statSelect === 3 && 
					<div className='Stat-Container'>
		  				{playerPos !== 1 ?<span className = 'Stat-Type'>Assists</span> : <span className = 'Stat-Type'>Shutouts</span>}
		  				{playerPos !== 1 ?<span className = 'Stat-Value'>{selectedPlayer.Assists}</span> : <span className = 'Stat-Value'>{selectedPlayer.Shutouts}</span>}
					</div>}
	  		</div>
		</div>
		<div className = 'Total-Stats-Container'>
	  		<ul ref = {ulRef} className = 'Player-Stats-Table'>
				{/* The 3 .maps below will run at different times depending on which stat is selected. These 3 are specifically for non-goalie positions */}
	  			{triggerStats && statSelect === 1 && playerPos !== 1? listOfStats.sort((a,b) => b.Points - a.Points ).slice(0,10).map((d, index)=>{
  
				return <li tabIndex = {0} ref = {liRef} onKeyDown = {(e)=>hoverOverPlayer(e)} onClick = {(e)=>hoverOverPlayer(e)} onMouseEnter={(e)=>hoverOverPlayer(e)} className = {InactiveClass} id = {d.ID} key = {d.ID}>
		  			<div className = 'Player-Stats-Row-Name-Div'>
		  				<span className = 'Name'>{d.First}</span>
		  				<span className = 'Name'>{d.Last}</span>
		 			 </div>
		  			<span className = 'Stat'>{d.Points}</span> 

				</li>
		
		
	  			}): null}
	  			{triggerStats && statSelect === 2 && playerPos !== 1? listOfStats.sort((a,b) => b.Goals - a.Goals ).slice(0,10).map((d, index)=>{
		
				return <li tabIndex = {0} ref = {liRef} onKeyDown = {(e)=>hoverOverPlayer(e)} onMouseEnter={(e)=>hoverOverPlayer(e)} onClick =  {(e)=>hoverOverPlayer(e)} className = {InactiveClass} id = {d.ID} key = {d.ID}>
		  			<div className = 'Player-Stats-Row-Name-Div'>
		  				<span className = 'Name'>{d.First}</span>
		  				<span className = 'Name'>{d.Last}</span>
		  			</div>
		  			<span className = 'Stat'>{d.Goals}</span>
				</li>
				}) : null}
	  			{triggerStats && statSelect === 3 && playerPos !== 1? listOfStats.sort((a,b) => b.Assists - a.Assists ).slice(0,10).map((d, index)=>{
		
				return <li tabIndex = {0} ref = {liRef} onKeyDown = {(e)=>hoverOverPlayer(e)} onMouseEnter={(e)=>hoverOverPlayer(e)} onClick =  {(e)=>hoverOverPlayer(e)} className = {InactiveClass} id = {d.ID} key = {d.ID}>
		  			<div className = 'Player-Stats-Row-Name-Div'>
		  				<span className = 'Name'>{d.First}</span>
		  				<span className = 'Name'>{d.Last}</span>
		  			</div>
		  			<span className = 'Stat'>{d.Assists}</span>
				</li>
				}) : null}
				{/* The 3 .maps below will run at different times depending on which stat is selected. These 3 are specifically for goalie positions */}
	  			{triggerStats && statSelect === 1 && playerPos === 1? listOfStats.sort((a,b) => a.GAA - b.GAA ).slice(0,10).map((d, index)=>{
  
  				return <li tabIndex = {0} ref = {liRef} onKeyDown = {(e)=>hoverOverPlayer(e)} onClick = {(e)=>hoverOverPlayer(e)} onMouseEnter={(e)=>hoverOverPlayer(e)} className = {InactiveClass} id = {d.ID} key = {d.ID}>
					<div className = 'Player-Stats-Row-Name-Div'>
						<span className = 'Name'>{d.First}</span>
						<span className = 'Name'>{d.Last}</span>
					</div>
					<span className = 'Stat'>{parseInt(d.GAA).toFixed(2)}</span>
				</li>
  				}): null}
				{triggerStats && statSelect === 2 && playerPos === 1? listOfStats.sort((a,b) => b.SavePercentage - a.SavePercentage ).slice(0,10).map((d, index)=>{
  
  				return <li tabIndex = {0} ref = {liRef} onKeyDown = {(e)=>hoverOverPlayer(e)} onMouseEnter={(e)=>hoverOverPlayer(e)} onClick =  {(e)=>hoverOverPlayer(e)} className = {InactiveClass} id = {d.ID} key = {d.ID}>
					<div className = 'Player-Stats-Row-Name-Div'>
						<span className = 'Name'>{d.First}</span>
						<span className = 'Name'>{d.Last}</span>
					</div>
					<span className = 'Stat'>{d.SavePercentage}</span>
  				</li>}) : null}
				{triggerStats && statSelect === 3 && playerPos === 1? listOfStats.sort((a,b) => b.Shutouts - a.Shutouts ).slice(0,10).map((d, index)=>{
  
  				return <li tabIndex = {0} ref = {liRef} onKeyDown = {(e)=>hoverOverPlayer(e)} onMouseEnter={(e)=>hoverOverPlayer(e)} onClick =  {(e)=>hoverOverPlayer(e)} className = {InactiveClass} id = {d.ID} key = {d.ID}>
					<div className = 'Player-Stats-Row-Name-Div'>
						<span className = 'Name'>{d.First}</span>
						<span className = 'Name'>{d.Last}</span>
					</div>
					<span className = 'Stat'>{d.Shutouts}</span>
  				</li>}) : null}
			</ul>
		</div>
  	</div>
	)
  
  
}
export default LeaderStats;