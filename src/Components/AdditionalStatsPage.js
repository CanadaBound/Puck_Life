import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

import NavBar from './NavBar';
import CareerStatsTable from './CareerStatsTable';
import LastGamesTable from './LastGamesTable';
import Banner from './Banner';
import {GetPlayerData, createOtherTitles, GetPlayerPhotos} from './APIInteractionFunctions';

import '../CSS/AdditionalStatsPage.css';

function AdditionalStatsPage(){
    var [basicPlayerData, setBasicPlayerData] = useState({});
    var [playerPhotos, setPlayerPhotos] = useState([]);
    var [thumbnail, setThumbnail] = useState('');
    var [otherTitles, setOtherTitles] = useState('');
    var [isDataLoaded, setIsDataLoaded] = useState(false);
    let { id } = useParams();
    
    useEffect(()=>{
        GetPlayerData(id).then(res => setBasicPlayerData(res.data.people[0]));
        
    },[id])

    useEffect(()=>{
        if(Object.keys(basicPlayerData).length !== 0){
            setIsDataLoaded(true);
            setOtherTitles(createOtherTitles(basicPlayerData.captain, basicPlayerData.alternateCaptain, basicPlayerData.rookie));
            GetPlayerPhotos(basicPlayerData.fullName).then(res => setPlayerPhotos(res.data.player));
        }else{
            setIsDataLoaded(false);
        }
            
    }, [basicPlayerData])

    useEffect(()=>{
        console.log(playerPhotos);
        if(playerPhotos!==null && playerPhotos[0] !== null && playerPhotos.length !== 0){
            console.log(playerPhotos);
            if(playerPhotos[0].strThumb !== null){
             
                setThumbnail(playerPhotos[0].strThumb);
              }else{
             
                setThumbnail('https://via.placeholder.com/250');
              }
        }else{
            setThumbnail('https://via.placeholder.com/250');
        }
    }, [playerPhotos])

    return(
         <div className = 'Additional-Stats-Page-Container'>
            <NavBar/>
            {isDataLoaded ? <div className ='Additional-Stats-Container'>
                <div className = 'Upper-Container'>
                    <div className = 'Photo-Placeholder'>
                        <Banner teamID = {basicPlayerData.currentTeam.id}/>
                    </div>
                    
                    <img className = 'Profile-Placeholder' alt = 'Profile of hockey player' src = {thumbnail}/>
                    
                     <div className = 'Stats-Bar'>
                        <div className = 'Name-Container'>
                            <span className = 'Span-Seperator'>{basicPlayerData.fullName}</span>
                            <span>#{basicPlayerData.primaryNumber}</span>
                        </div>
                        <div className = 'Extra-Stats-Container'>
                            <span className = 'Span-Seperator'>{basicPlayerData.primaryPosition['name']}</span>
                            <span className = 'Span-Seperator'>{basicPlayerData.height}</span>
                            <span className = 'Span-Seperator'> {basicPlayerData.weight} lb</span>
                            <span className = 'Span-Seperator'>Age: {basicPlayerData.currentAge}</span>
                            <span className = 'Span-Seperator'>{basicPlayerData.currentTeam['name']}</span>
                            <span >{otherTitles}</span>
                        </div>
                        <div className = 'Extra-Stats-Container-Mobile'>
                            <span className = 'Span-Seperator'>Born: {basicPlayerData.birthDate}</span>
                            <span className = 'Span-Seperator'> Birthplace: {basicPlayerData.birthCity}, {basicPlayerData.birthCountry}</span>
                            <span className = 'Span-Seperator'> Shoots: {basicPlayerData.shootsCatches}</span>
                        </div>
                        
                    </div> 

                </div>
                <div className = 'Mid-Container'>
                    <div className = 'Additional-Details'>
                        <div className = 'Detail-Headers'>
                           <span>Born:</span>
                           <span>Birthplace:</span>
                           <span>Shoots:</span> 
                        </div>
                        <div className = 'Detail-Stats'>
                           <span>{basicPlayerData.birthDate}</span>
                           <span>{basicPlayerData.birthCity}, {basicPlayerData.birthCountry}</span>
                           <span>{basicPlayerData.shootsCatches}</span> 
                        </div>   
                    </div>
                   <CareerStatsTable playerID = {basicPlayerData.id} teamID = {basicPlayerData.currentTeam.id}/>
                    
                </div>
                <div className = 'Lower-Container'>
                    <div className = 'Last-Games-Title-Container'>
                        <span className = 'Last-Games-Title'>Last 5 Games</span>
                    </div>
                    <div className = 'Last-Games-Table-Container'>
                        <LastGamesTable playerID = {basicPlayerData.id} teamID = {basicPlayerData.currentTeam.id}/>
                    </div>
                </div>

            </div> : <div>Data is loading</div>} 
        </div>
    );

}
export default AdditionalStatsPage;