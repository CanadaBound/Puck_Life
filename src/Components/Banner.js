import '../CSS/Banner.css';
import teamDetail from '../Assets/teamDetail';
import { useEffect, useState } from 'react';
import {GetContrastYIQ} from './APIInteractionFunctions.js';

function Banner({teamID}){
    var [teamData, setTeamData] = useState({});
    var [textColor, setTextColor] = useState('');
    var [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=>{
        var result = teamDetail.find(teams => {
            return teams.ID === teamID;
        })

        setTeamData(result);
    }, [teamID])

    useEffect(()=>{
        console.log(teamData.URL);
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