import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

import NavBar from './NavBar';
import CareerStatsTable from './CareerStatsTable';
import LastGamesTable from './LastGamesTable';
import Banner from './Banner';
import {GetPlayerData, createOtherTitles, GetPlayerPhotos} from './APIInteractionFunctions';

import '../CSS/AdditionalStatsPage.css';

function AdditionalStatsPage({theme, setTheme}){
    var [basicPlayerData, setBasicPlayerData] = useState({});
    var [playerPhotos, setPlayerPhotos] = useState([]);
    var [thumbnail, setThumbnail] = useState('');
    var [otherTitles, setOtherTitles] = useState('');
    var [isDataLoaded, setIsDataLoaded] = useState(false);
    //This is the id passed in via URL.
    let { id } = useParams();
    
    //After being redirected to this component with the selected player id we load the initial standard player data (name, team, position, jerseyNo)
    useEffect(()=>{
        GetPlayerData(id).then(res => setBasicPlayerData(res.data.people[0]));
        
    },[id])

    //Once the data is set and it's not empty we allow the html elements to render, we run a script to get the player photo 
    //that we will display on the page and we also run a small script to show whether the player is a captain, rookie or alternate captain.
    useEffect(()=>{
        if(Object.keys(basicPlayerData).length !== 0){
            setIsDataLoaded(true);
            setOtherTitles(createOtherTitles(basicPlayerData.captain, basicPlayerData.alternateCaptain, basicPlayerData.rookie));
            GetPlayerPhotos(basicPlayerData.fullName).then(res => setPlayerPhotos(res.data.player));
        }else{
            setIsDataLoaded(false);
        }
            
    }, [basicPlayerData])

    //Once we've gotten the promise from the GetPlayerPhotos function we then decide what picture to load. We ideally want 
    //to load a thumbnail image but not every player will have one. Second option is a cutout image and if neither of them are available
    //or there isn't a record for a player we just add a placeholder.
    useEffect(()=>{
       
        if(playerPhotos!==null && playerPhotos[0] !== null && playerPhotos.length !== 0){
           
            if(playerPhotos[0].strThumb !== null){
             
                setThumbnail(playerPhotos[0].strThumb);

            }else if(playerPhotos[0].strCutout){

                setThumbnail(playerPhotos[0].strCutout);

            }else{
                setThumbnail('https://via.placeholder.com/250');
            }		
        }else{
            setThumbnail('https://via.placeholder.com/250');
        }
    }, [playerPhotos])

    return(
         <main className = 'Additional-Stats-Page-Container'>
            <NavBar theme = {theme} setTheme={setTheme}/>
            {isDataLoaded ? <article className ='Additional-Stats-Container'>
                <section className = 'Upper-Container'>
                    <header className = 'Photo-Placeholder'>
                        <Banner teamID = {basicPlayerData.currentTeam.id}/>
                    </header>
                    
                    <img className = 'Profile-Placeholder' alt = 'Profile of hockey player' src = {thumbnail}/>
                    
                    <section className = 'Stats-Bar'>
                        <div className = 'Name-Container'>
                            <p className = 'p-Seperator'>{basicPlayerData.fullName}</p>
                            <p>#{basicPlayerData.primaryNumber}</p>
                        </div>
                        <div className = 'Extra-Stats-Container'>
                            <p className = 'p-Seperator'>{basicPlayerData.primaryPosition['name']}</p>
                            <p className = 'p-Seperator'>{basicPlayerData.height}</p>
                            <p className = 'p-Seperator'> {basicPlayerData.weight} lb</p>
                            <p className = 'p-Seperator'>Age: {basicPlayerData.currentAge}</p>
                            <p className = 'p-Seperator'>{basicPlayerData.currentTeam['name']}</p>
                            <p >{otherTitles}</p>
                        </div>
                        <div className = 'Extra-Stats-Container-Mobile'>
                            <p className = 'p-Seperator'>Born: {basicPlayerData.birthDate}</p>
                            <p className = 'p-Seperator'> Birthplace: {basicPlayerData.birthCity}, {basicPlayerData.birthCountry}</p>
                            <p className = 'p-Seperator'> Shoots: {basicPlayerData.shootsCatches}</p>
                        </div>
                        
                    </section> 

                </section>
                <section className = 'Mid-Container'>
                    <div className = 'Additional-Details'>
                        <div className = 'Detail-Headers'>
                           <p>Born:</p>
                           <p>Birthplace:</p>
                           <p>Shoots:</p> 
                        </div>
                        <div className = 'Detail-Stats'>
                           <p>{basicPlayerData.birthDate}</p>
                           <p>{basicPlayerData.birthCity}, {basicPlayerData.birthCountry}</p>
                           <p>{basicPlayerData.shootsCatches}</p> 
                        </div>   
                    </div>
                   <CareerStatsTable playerID = {basicPlayerData.id}/>
                    
                </section>
                <section className = 'Lower-Container'>
                    <div className = 'Last-Games-Title-Container'>
                        <p className = 'Last-Games-Title'>Last 5 Games</p>
                    </div>
                    <div className = 'Last-Games-Table-Container'>
                        <LastGamesTable playerID = {basicPlayerData.id} teamID = {basicPlayerData.currentTeam.id}/>
                    </div>
                </section>

            </article> : <article>Data is loading</article>} 
        </main>
    );

}
export default AdditionalStatsPage;