import axios from "axios";
import '../CSS/TeamSelector.css';
import { useEffect, useState } from "react";
import teamDetail from "../Assets/teamDetail";

function TeamSelector( {toggleStats, setListTeams}) {

    const [listOfTeams, setListOfTeams] = useState([]);
    const [listOfURL, setListOfURL] = useState([]);
    const [selectedTeams, setSelectedTeams] = useState([]);

    useEffect(()=>{
        console.log(selectedTeams);
        setListTeams(selectedTeams);
        
    }, [selectedTeams])
    

    function handleClick(e){

        const selectedTeamsCopy = [...selectedTeams];
        if(selectedTeams.includes(e.currentTarget.id)){
            if(selectedTeams.length <= 1){
                toggleStats(false);
                selectedTeamsCopy.splice(selectedTeamsCopy.indexOf(e.currentTarget.id, 1), 1);
                setSelectedTeams(selectedTeamsCopy);
            }else{
                selectedTeamsCopy.splice(selectedTeamsCopy.indexOf(e.currentTarget.id, 1), 1);
                setSelectedTeams(selectedTeamsCopy);
            }
        }else {
            if(selectedTeams.length === 0){
                toggleStats(true);
                selectedTeamsCopy.push(e.currentTarget.id);
                setSelectedTeams(selectedTeamsCopy);
            }else{
                selectedTeamsCopy.push(e.currentTarget.id);
                setSelectedTeams(selectedTeamsCopy);
            }
        }

        if(e.target.style.opacity === '1'){
            e.target.style.opacity = '25%';
        }else {
            e.target.style.opacity = '100%';
        }
        
    }

return (

        <div className = 'Team-Logo-Container'>
            {teamDetail.map((Teams)=>(
                
                
                    <img onClick={(e) => handleClick(e)} key = {Teams.ID} id = {Teams.ID} alt = {Teams.Name +' Logo'} src = {Teams.URL} className = 'logo'/>
               
            ))}


        </div>
    
    
    );
  }
  
  export default TeamSelector;