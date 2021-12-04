import { useEffect, useState } from 'react';
import {FaChevronLeft, FaChevronRight, FaTheaterMasks} from 'react-icons/fa';

import '../CSS/LeagueLeaders.css';
import Instruction from './Instruction';

import LeaderStats from './LeaderStats.js';

function LeagueLeaders({showStats, getListTeams}){

    var title = ['Skaters', 'Goalies', 'Defencemen'];
    var [titleNo, setTitleNo] = useState(0);
    var [statSelect, setStatSelect] = useState(1);
    var [cssClass1, setCSSClass1] = useState('Stat-Select-1');
    var [cssClass2, setCSSClass2] = useState('Stat-Select-2');
    var [cssClass3, setCSSClass3] = useState('Stat-Select-3');
    var goalieOptions = ['GAA', 'SV%', 'SHUTOUTS'];
    var nonGoalieOptions = ['POINTS', 'GOALS', 'ASSISTS'];


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

    return(
        <div className = 'Leaders-Container'>
            <div className = 'Leaders-Title'>
                
                   <FaChevronLeft className = 'toggleArrow' size = {24} color = 'white' onClick={() => selectPosition('-')}/> 
              
                
                <h1>{title[titleNo]}</h1>
                
                   <FaChevronRight className = 'toggleArrow' size = {24} color = 'white' onClick={() => selectPosition('+')}/> 
                
                
            </div>
            <div className = 'Leaders-Selection-Container'>
                <div className = {cssClass1}>
                    <p onClick = {(e)=> handleStatChange(e)}>{titleNo == 1 ? goalieOptions[0]: nonGoalieOptions[0]}</p>
                </div>
                <div className = {cssClass2}>
                    <p onClick = {(e)=> handleStatChange(e)}>{titleNo == 1 ? goalieOptions[1]: nonGoalieOptions[1]}</p>
                </div>
                <div className = {cssClass3}>
                    <p onClick = {(e)=> handleStatChange(e)}>{titleNo == 1 ? goalieOptions[2]: nonGoalieOptions[2]}</p>
                </div>
            </div>
            <div className = 'Leaders-Stats-Container'>
                {showStats ? <LeaderStats playerPos = {titleNo} teams = {getListTeams} statSelect = {statSelect}/> : <Instruction/>}
            </div>
            
        </div>
    );
}

export default LeagueLeaders;