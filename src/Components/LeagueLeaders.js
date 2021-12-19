import { useEffect, useRef, useState } from 'react';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';

import '../CSS/LeagueLeaders.css';

import Instruction from './Instruction';
import LeaderStats from './LeaderStats.js';

function LeagueLeaders({showStats, getListTeams, theme}){

	var title = ['Skaters', 'Goalies', 'Defencemen'];
	var goalieOptions = ['GAA', 'SV%', 'SHUTOUTS'];
	var nonGoalieOptions = ['POINTS', 'GOALS', 'ASSISTS'];

	var [titleNo, setTitleNo] = useState(0);
	var [statSelect, setStatSelect] = useState(1);

	var [cssClass1, setCSSClass1] = useState('Stat-Select-1');
	var [cssClass2, setCSSClass2] = useState('Stat-Select-2');
	var [cssClass3, setCSSClass3] = useState('Stat-Select-3');

  
	const Stats1Ref = useRef();
	const Stats2Ref = useRef();
	const Stats3Ref = useRef();
	

	//This function switches the selected stat tab to active depending on which one was clicked. It also sets the stats links
	//as fully inactive when there's no team selected.
	function switchActive(switchValue){
		if(switchValue === 0){
			setCSSClass1('Stat-Select-1');
			setCSSClass2('Stat-Select-2');
			setCSSClass3('Stat-Select-3');
		}else if(switchValue === 1){
			setCSSClass1('Stat-Select-1-Active');
			setCSSClass2('Stat-Select-2');
			setCSSClass3('Stat-Select-3');
			setStatSelect(1);
		}else if(switchValue === 2){
			setCSSClass1('Stat-Select-1');
			setCSSClass2('Stat-Select-2-Active');
			setCSSClass3('Stat-Select-3');
			setStatSelect(2);
		}else if(switchValue === 3){
			setCSSClass1('Stat-Select-1');
			setCSSClass2('Stat-Select-2');
			setCSSClass3('Stat-Select-3-Active');
			setStatSelect(3);
		}
		
	}
  
  useEffect(()=>{
	  
        // theme === 'dark'? iconColor = 'dark' : setIconColor('white');
    }, [theme]);
  
	//This useEffect sets the stats to fully inactive if the team list is zero and otherwise when the team list is updated it sets the selected
	//stat as the first stat.
	 useEffect(()=>{
		if(getListTeams.length === 0){
			switchActive(0);
			
		}else{
		
			switchActive(1);
		}
	},[getListTeams])

	
	//This function allows the user to switch between which player positions they want to see the stats for.
	function selectPosition(task){
		if(task === '+' && titleNo <2){
			setTitleNo(titleNo+1);
			switchActive(1);
		}else if (task === '+' && titleNo === 2){
			setTitleNo(0);
			switchActive(1);
		}else if(task === '-' && titleNo >0){
			setTitleNo(titleNo-1);
			switchActive(1);
		}else{
			setTitleNo(2);
			switchActive(1);
		}
	   
	}


   
	//When a user chooses the stat they want we find out if it's class 1, 2 or 3 and then run the switching function depending on which
	//one it is.
	function handleStatChange(event){
		if(event.target.parentElement.className.includes(1)){
			switchActive(1);
			
		}
		if(event.target.parentElement.className.includes(2)){
			switchActive(2);
		}
		if(event.target.parentElement.className.includes(3)){
			switchActive(3);
			
		}
	}

	// //This function allows the user to navigate by keyboard.
	// function handleArrowKey(event){
		
	// 	if(event.key === 'Enter'){
	// 		if(event.target.id === '-'){
				
	// 			selectPosition('-');
	// 		}else if(event.target.id === '+'){
				
	// 			selectPosition('+');
	// 		}
	// 	}
		
	// }

	// //This function also allows the user to navigate with a keyboard and shows the css correctly when that happens.
	// function handleEnter(event){
		
	// 	if(event.key === 'Enter'){
	// 		if(Stats1Ref.current === event.currentTarget){
	// 			handleStatChange(event);
	// 			Stats1Ref.current.focus();
	// 		}else if (Stats2Ref.current === event.currentTarget){
	// 			handleStatChange(event);
	// 			Stats2Ref.current.focus();
	// 		}else if(Stats3Ref.current === event.currentTarget){
	// 			handleStatChange(event);
	// 			Stats3Ref.current.focus();
	// 		}
	// 	}
		
	// }


    return(
        <div className = 'Leaders-Container'>
            <section className = 'Leaders-Title'>
                <button className = 'Left-Button' onClick={() => selectPosition('-')}>
                	<FaChevronLeft id = '-' aria-label = 'Select position before current one' className = 'toggleArrowLeft' size = {36} /> 
				</button>

                <p aria-label = 'Currently selected position' className = 'Player-Position-Type'>{title[titleNo]}</p>
                
				<button className = 'Right-Button' onClick={() => selectPosition('+')}>
					<FaChevronRight id = '+' aria-label = 'Select position after current one' className = 'toggleArrowRight' size = {36}/>
				</button>
                    
                
                
            </section>
            <section className = 'Leaders-Selection-Container'>
                <button className = {cssClass1} onClick = {(e)=> handleStatChange(e)}>
                    <p aria-label = 'Click to show points stat or goals against average if goalie' ref = {Stats1Ref}>{titleNo === 1 ? goalieOptions[0]: nonGoalieOptions[0]}</p>
                </button>
                <button className = {cssClass2} onClick = {(e)=> handleStatChange(e)}>
                    <p aria-label = 'Click to show goals stat or save percentage if goalie' ref = {Stats2Ref}>{titleNo === 1 ? goalieOptions[1]: nonGoalieOptions[1]}</p>
                </button>
                <button className = {cssClass3} onClick = {(e)=> handleStatChange(e)}>
                    <p aria-label = 'Click to show assists stat or shutouts if goalie' ref = {Stats3Ref}>{titleNo === 1 ? goalieOptions[2]: nonGoalieOptions[2]}</p>
                </button>
            </section>
            <section className = 'Leaders-Stats-Container'>
                {showStats ? <LeaderStats playerPos = {titleNo} teams = {getListTeams} statSelect = {statSelect}/> : <Instruction/>}
            </section>
            
        </div>
    );

}

export default LeagueLeaders;