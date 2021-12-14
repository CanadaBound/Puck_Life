import '../CSS/Banner.css';
import teamDetail from '../Assets/teamDetail';
import { useEffect, useState } from 'react';
import {GetContrastYIQ} from './APIInteractionFunctions.js';

function Banner({teamID}){
    var [teamData, setTeamData] = useState({});
    var [isLoaded, setIsLoaded] = useState(false);

    //This useEffect takes a teamID passed to the component when a user selects a player they want to see more information about. This ID is used to filter through
    //the locally stored object array of teams and the resulting data is stored in the state to be used later to display the name and logo.
    useEffect(()=>{
        var result = teamDetail.find(teams => {
            return teams.ID === teamID;
        })

        setTeamData(result);
    }, [teamID])

    //This useEffect is used to avoid the issue of no data being available on load of the page. It allows the states to update properly before anything is displayed to the user.
    useEffect(()=>{
        
        if(Object.keys(teamData).length !== 0){
            setIsLoaded(true);
            
            
        }else{
            setIsLoaded(false);
        }
    }, [teamData])
    
    return( 
        <>
        {isLoaded ? 
            <div className = 'Banner-Container' style={{backgroundColor: teamData.Color}}>
                <div className = 'Banner-Image-Container'>
                    <img className = 'Banner-Image' alt = 'Logo of the players team' src = {teamData.URL}/>
                </div>
                <div className = 'Banner-Text'>
                    <span className = 'Team-Name-Banner' style = {{color: GetContrastYIQ(teamData.Color)}}> {teamData.Name}</span>
                </div>
            </div>: <div> </div>}
        </>
    );
}
export default Banner;