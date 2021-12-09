import axios from "axios";
import '../CSS/TeamSelector.css';
import { useEffect, useRef, useState } from "react";
import teamDetail from "../Assets/teamDetail";

function TeamSelector( {toggleStats, setListTeams}) {

    const [selectedTeams, setSelectedTeams] = useState([]);
    const imageDivRef = useRef();
    const imageRef = useRef();
    
    useEffect(()=>{
        imageRef.current = imageDivRef.current.firstChild;
    },[])
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

    function setElementTabIndex(imgRef){
        imageRef.current.tabIndex = -1;
        imageRef.current = imgRef;
        imageRef.current.tabIndex = 0;
        imageRef.current.focus();
    }

    function handleKeyDown(e){
        
        if (e.key === 'Enter') {
            handleClick(e);
        }
        if( e.key === 'ArrowDown'){
            console.log(imageRef.current.id);
            if(imageRef.current.id < 55){
                setElementTabIndex(imageRef.current.nextElementSibling);
                
            }
            else{
                setElementTabIndex(imageDivRef.current.firstChild);
                
            }
        }
        if( e.key === 'ArrowUp'){
            if(imageRef.current.id > 1){
                setElementTabIndex(imageRef.current.previousElementSibling);
                
            }
            else{
                setElementTabIndex(imageDivRef.current.lastElementChild);
               
            }
        }
        
        
    }

return (

        <div tabIndex = {0} ref = {imageDivRef} className = 'Team-Logo-Container'>
            {teamDetail.map((Teams, index)=>{
                
                
                return <img ref = {imageRef} tabindex = {index === 0 ? 0 : -1} aria-label = 'Click to select team' onClick={(e) => handleClick(e)} onKeyDown = {(e)=> handleKeyDown(e)}key = {Teams.ID} id = {Teams.ID} alt = {Teams.Name +' Logo'} src = {Teams.URL} className = 'logo'/>
               
                }            
            )}


        </div>
    
    
    );
  }
  
  export default TeamSelector;