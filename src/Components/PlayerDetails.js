import { useEffect, useState, useRef } from 'react/cjs/react.development';
import axios from 'axios';
import '../CSS/PlayerDetails.css';
import '../Fonts/Kabel-Black.otf';
function PlayerDetails({player, team, jersey}){
    const playerURLPlaceholder = `https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=${player}`;
    const teamURLPlaceholder = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${team}`;
    
    var [imageURL, setImageURL] = useState('');
    var [imageTeamURL, setImageTeamURL] = useState('');

    

    useEffect(() => {
       
        
        axios.get(playerURLPlaceholder).then(res => { 
          if(res.data.player != null){
            setImageURL(res.data.player[0].strThumb);
          }else{
            setImageURL('https://image.freepik.com/free-vector/hockey-puck-cry-with-tissue-character_193274-1722.jpg');
          }
          
          
        });


      }, [player]);

      useEffect(() => {

          
          axios.get(teamURLPlaceholder).then(res => { 
          setImageTeamURL(res.data.teams[0].strTeamBadge);
          
        });
        
        
        

      }, [team]);

     
   
    return (
      <div className = 'cardLayout'>

            <div className = 'ImageJersey'>  
                <div className = 'jerseyNumber'><p className = "jerseyFont">{'#'+jersey}</p></div>
                <div className = 'playerImage'><img className = "playerImgTag" src={imageURL}></img></div>  
            </div>  
            <div className = 'TeamPlayerImage'>
              <div className = 'teamImage'><img className = "teamImgTag" src={imageTeamURL}></img></div>
              <div className = 'TeamPlayerInfo'>
                  <div className = 'teamName'><p className = "teamFont">{team.toUpperCase()}</p></div>
                  <div className = 'playerName'><p className = "playerFont">{player.toUpperCase()}</p></div>  
              </div>
                
                
            </div>
            

            </div>

      
            
        );
                
   
   
}
export default PlayerDetails;
