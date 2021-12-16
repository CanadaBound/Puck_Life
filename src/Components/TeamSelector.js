import '../CSS/TeamSelector.css';
import { useEffect, useRef, useState } from "react";
import teamDetail from "../Assets/teamDetail";

function TeamSelector( {toggleStats, setListTeams}) {

    const [selectedTeams, setSelectedTeams] = useState([]);
    const imageDivRef = useRef();
    const imageRef = useRef();
    //This useEffect sets the first element in the list as the current reference on load. Without this the image reference 
    //ends up being a random image of the 32 available.
    useEffect(()=>{
        imageRef.current = imageDivRef.current.firstChild;
    },[])

    //This useEffect triggers everytime a user has selected a team, the useState sets a state in the parent component of Landing Page
    //which is then distributed across the rest of the components where needed.
    useEffect(()=>{
        
        setListTeams(selectedTeams);
        
    }, [selectedTeams, setListTeams])
    

    function handleClick(e){
        //This part of the function takes a copy of the current value of selectedTeams, checks if the selected team 
        //already exists in the list, if it doesn't and the there is no existing team we show the teams roster and push
        //the id to the list. If there's teams already in the list we just add the team to the list. 
        //If the team already exists in the list and the list has only one team in it, we remove the team and stop displaying the stats
        //if there is more than 1 team we just remove the team from the list.
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
        
        //This allows the logo to flip from being bright when clicked initially, if it's clicked off it switches back to dark.

        if(e.currentTarget.style.opacity === '1' || e.currentTarget.style.opacity === '100%'){
            e.currentTarget.style.opacity = '25%';
        }else {
            e.currentTarget.style.opacity = '100%';
        }
        
    }

    //This is a function to allow the user to navigate through the logos using the tab button. This is known as a roving tabindex.
    function setElementTabIndex(imgRef){
        imageRef.current.tabIndex = -1;
        imageRef.current = imgRef;
        imageRef.current.tabIndex = 0;
        imageRef.current.focus();
    }


    //This function catches the users key action, which allows using the keyboard for navigation. If enter is hit we trigger the same function 
    //as if the user clicked the mouse. Arrow down and up allows us to have the roving tabindex. It also catches when the user is at the start
    //or end of the list and selects the first or last element depending on which key was pressed and where the users current position is.
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
                return <img ref = {imageRef} tabIndex = {index === 0 ? 0 : -1} aria-label = 'Click to select team' onClick={(e) => handleClick(e)} onKeyDown = {(e)=> handleKeyDown(e)}key = {Teams.ID} id = {Teams.ID} alt = {Teams.Name +' Logo'} src = {Teams.URL} className = 'logo'/>
            })}
        </div>
    );
}
  export default TeamSelector;