import { useEffect, useRef, useState } from 'react';
import {FaChevronLeft, FaChevronRight, FaTheaterMasks} from 'react-icons/fa';

import '../CSS/LeagueLeaders.css';
import Instruction from './Instruction';

import LeaderStats from './LeaderStats.js';

function LeagueLeaders({showStats, getListTeams, theme}){

    var title = ['Skaters', 'Goalies', 'Defencemen'];
    var [titleNo, setTitleNo] = useState(0);
    var [statSelect, setStatSelect] = useState(1);
    var [cssClass1, setCSSClass1] = useState('Stat-Select-1');
    var [cssClass2, setCSSClass2] = useState('Stat-Select-2');
    var [cssClass3, setCSSClass3] = useState('Stat-Select-3');
    var [iconColor, setIconColor] = useState('white');
    var goalieOptions = ['GAA', 'SV%', 'SHUTOUTS'];
    var nonGoalieOptions = ['POINTS', 'GOALS', 'ASSISTS'];
    const Stats1Ref = useRef();
    const Stats2Ref = useRef();
    const Stats3Ref = useRef();
    
    function selectPosition(task){
        if(task === '+' && titleNo <2){
            setTitleNo(titleNo+1);
        }else if (task === '+' && titleNo == 2){
            setTitleNo(0);
        }else if(task === '-' && titleNo >0){
            setTitleNo(titleNo-1);
        }else{
            setTitleNo(2);
        }
       
    }

    useEffect(()=>{
        theme === 'dark'? setIconColor('dark') : setIconColor('white');
    }, [theme]);

    useEffect(()=>{
        if(getListTeams.length === 0){
            setCSSClass1('Stat-Select-1');
            setCSSClass2('Stat-Select-2');
            setCSSClass3('Stat-Select-3');
        }else if(getListTeams.length === 1){
            setCSSClass1('Stat-Select-1-Active');
            setCSSClass2('Stat-Select-2');
            setCSSClass3('Stat-Select-3');
        }
    },[getListTeams])

    function handleStatChange(event){
        if(event.target.parentElement.className.includes(1)){
            
            setCSSClass1('Stat-Select-1-Active');
            setCSSClass2('Stat-Select-2');
            setCSSClass3('Stat-Select-3');
            setStatSelect(1);
        }
        if(event.target.parentElement.className.includes(2)){
            
            setCSSClass1('Stat-Select-1');
            setCSSClass2('Stat-Select-2-Active');
            setCSSClass3('Stat-Select-3');
            setStatSelect(2);
        }
        if(event.target.parentElement.className.includes(3)){
           
            setCSSClass1('Stat-Select-1');
            setCSSClass2('Stat-Select-2');
            setCSSClass3('Stat-Select-3-Active');
            setStatSelect(3);
        }
    }

    function handleArrowKey(event){
        
        if(event.key === 'Enter'){
            if(event.target.id === '-'){
                
                selectPosition('-');
            }else if(event.target.id === '+'){
                
                selectPosition('+');
            }
        }
        
    }

    function handleEnter(event){
        
        if(event.key === 'Enter'){
            console.log(event.currentTarget);
            console.log(Stats1Ref);
            if(Stats1Ref.current === event.currentTarget){
                handleStatChange(event);
                Stats1Ref.current.focus();
            }else if (Stats2Ref.current === event.currentTarget){
                handleStatChange(event);
                Stats2Ref.current.focus();
            }else if(Stats3Ref.current === event.currentTarget){
                handleStatChange(event);
                Stats3Ref.current.focus();
            }
        }
        
    }

    return(
        <div className = 'Leaders-Container'>
            <div tabIndex = {0} className = 'Leaders-Title'>
                
                   <FaChevronLeft tabIndex = {0} id = '-' aria-label = 'Select position before current one' className = 'toggleArrowLeft' size = {36} color = {iconColor} onClick={() => selectPosition('-')} onKeyDown ={(e)=>handleArrowKey(e)}/> 
              
                
                <span aria-label = 'Currently selected position' className = 'Player-Position-Type'>{title[titleNo]}</span>
                
                   <FaChevronRight tabIndex = {0} id = '+' aria-label = 'Select position after current one' className = 'toggleArrowRight' size = {36} color = {iconColor} onClick={() => selectPosition('+')} onKeyDown ={(e)=>handleArrowKey(e)}/> 
                
                
            </div>
            <div tabIndex = {0} className = 'Leaders-Selection-Container'>
                <div className = {cssClass1} >
                    <p tabIndex = {0} aria-label = 'Click to show points stat or goals against average if goalie' ref = {Stats1Ref} onKeyDown ={(e)=>handleEnter(e)} onClick = {(e)=> handleStatChange(e)}>{titleNo == 1 ? goalieOptions[0]: nonGoalieOptions[0]}</p>
                </div>
                <div className = {cssClass2} >
                    <p tabIndex = {0} aria-label = 'Click to show goals stat or save percentage if goalie' ref = {Stats2Ref} onKeyDown ={(e)=>handleEnter(e)} onClick = {(e)=> handleStatChange(e)}>{titleNo == 1 ? goalieOptions[1]: nonGoalieOptions[1]}</p>
                </div>
                <div className = {cssClass3}>
                    <p tabIndex = {0} aria-label = 'Click to show assists stat or shutouts if goalie' ref = {Stats3Ref} onKeyDown ={(e)=>handleEnter(e)} onClick = {(e)=> handleStatChange(e)}>{titleNo == 1 ? goalieOptions[2]: nonGoalieOptions[2]}</p>
                </div>
            </div>
            <div className = 'Leaders-Stats-Container'>
                {showStats ? <LeaderStats playerPos = {titleNo} teams = {getListTeams} statSelect = {statSelect}/> : <Instruction/>}
            </div>
            
        </div>
    );
}

export default LeagueLeaders;