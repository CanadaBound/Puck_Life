import { useEffect, useState } from 'react';

import '../CSS/CareerStatsTable.css';

import {GetCareerData, formatDate, sumCareerStats} from './APIInteractionFunctions';


function CareerStatsTable({playerID}){

    var [careerData, setCareerData] = useState([]);
    var [isLoaded, setIsLoaded] = useState(false);
   
    //This useEffect gets the data from api helper function which return a promise containing the entire career of the player
    //with the response we then reverse the array as the first entry is the earliest in the career and set the state that the table 
    //is generated from to the career data we retrieved.
    useEffect(()=>{
        
        GetCareerData(playerID).then(res => {
            var tempArr = res.data.stats[0].splits;
            var reverseArr = tempArr.reverse();
            setCareerData(reverseArr);
        })
    }, [playerID])

    
    useEffect(()=>{
       
        careerData.length >0 ? setIsLoaded(true): setIsLoaded(false);
        
    }, [careerData])


    return(
        <article className = 'Career-Stats'>
            <header className = 'Career-Table-Header'>
                <div className = 'Career-Table-Team-Header-Span-Div'><span className = 'Career-Table-Header-Span'>Season</span></div>
                <div className = 'Career-Table-Team-Header-Span-Div'><span className = 'Career-Table-Header-Span'>Team</span></div>
                <div className = 'Career-Table-Header-Span-Div'><span className = 'Career-Table-Header-Span'>GP</span></div>
                <div className = 'Career-Table-Header-Span-Div'><span className = 'Career-Table-Header-Span'>G</span></div>
                <div className = 'Career-Table-Header-Span-Div'><span className = 'Career-Table-Header-Span'>A</span></div>
                <div className = 'Career-Table-Header-Span-Div'><span className = 'Career-Table-Header-Span'>P</span></div>
                <div className = 'Career-Table-Header-Span-Div'><span className = 'Career-Table-Header-Span'>+/-</span></div>
                <div className = 'Career-Table-Header-Span-Div'><span className = 'Career-Table-Header-Span'>PIM</span></div>
                <div className = 'Career-Table-Header-Span-Div'><span className = 'Career-Table-Header-Span'>PPG</span></div>
                <div className = 'Career-Table-Header-Span-Div'><span className = 'Career-Table-Header-Span'>PPP</span></div>
                <div className = 'Career-Table-Header-Span-Div'><span className= 'Career-Table-Header-Span'>SHG</span></div>
                <div className = 'Career-Table-Header-Span-Div'><span className = 'Career-Table-Header-Span'>SHP</span></div>
                <div className = 'Career-Table-Header-Span-Div'><span className = 'Career-Table-Header-Span'>GWG</span></div>
                <div className = 'Career-Table-Header-Span-Div'><span className = 'Career-Table-Header-Span'>OTG</span></div>
                <div className = 'Career-Table-Header-Span-Div'><span className = 'Career-Table-Header-Span'>S</span></div>
                <div className = 'Career-Table-Header-Span-Div'><span className = 'Career-Table-Header-Span'>S%</span></div>
            </header>
            {isLoaded ? careerData.map((career, index) => {
                return <section key = {career.season+career.team.name+index} className = 'Career-Table-Season-Row'>
                    <div className = 'Career-Table-Season-Row-Highlight-Team-Div'><span className = 'Career-Table-Season-Row-Highlight-Span' >{formatDate(career.season)}</span></div>
                    <div className = 'Career-Table-Season-Row-Highlight-Team-Div'><span className = 'Career-Table-Season-Row-Highlight-Span'>{career.team.name}</span></div>
                    <div className = 'Career-Table-Season-Row-Span-Div'><span className = 'Career-Table-Season-Row-Span'>{career.stat.games !== undefined? career.stat.games : 'N/A'}</span></div>
                    <div className = 'Career-Table-Season-Row-Span-Div'><span className = 'Career-Table-Season-Row-Span'>{career.stat.goals !== undefined? career.stat.goals : 'N/A'}</span></div>
                    <div className = 'Career-Table-Season-Row-Span-Div'><span className = 'Career-Table-Season-Row-Span'>{career.stat.assists !== undefined? career.stat.assists : 'N/A'}</span></div>
                    <div className = 'Career-Table-Season-Row-Span-Div'><span className = 'Career-Table-Season-Row-Span'>{career.stat.points !== undefined? career.stat.points : 'N/A'}</span></div>
                    <div className = 'Career-Table-Season-Row-Span-Div'><span className = 'Career-Table-Season-Row-Span'>{career.stat.plusMinus !== undefined? career.stat.plusMinus : 'N/A'}</span></div>
                    <div className = 'Career-Table-Season-Row-Span-Div'><span className = 'Career-Table-Season-Row-Span'>{career.stat.pim !== undefined? career.stat.pim : 'N/A'}</span></div>
                    <div className = 'Career-Table-Season-Row-Span-Div'><span className = 'Career-Table-Season-Row-Span'>{career.stat.powerPlayGoals !== undefined? career.stat.powerPlayGoals : 'N/A'}</span></div>
                    <div className = 'Career-Table-Season-Row-Span-Div'><span className = 'Career-Table-Season-Row-Span'>{career.stat.powerPlayPoints !== undefined? career.stat.powerPlayPoints : 'N/A'}</span></div>
                    <div className = 'Career-Table-Season-Row-Span-Div'><span className = 'Career-Table-Season-Row-Span'>{career.stat.shortHandedGoals !== undefined? career.stat.shortHandedGoals : 'N/A'}</span></div>
                    <div className = 'Career-Table-Season-Row-Span-Div'><span className = 'Career-Table-Season-Row-Span'>{career.stat.shortHandedPoints !== undefined? career.stat.shortHandedPoints : 'N/A'}</span></div>
                    <div className = 'Career-Table-Season-Row-Span-Div'><span className = 'Career-Table-Season-Row-Span'>{career.stat.gameWinningGoals !== undefined? career.stat.gameWinningGoals : 'N/A'}</span></div>
                    <div className = 'Career-Table-Season-Row-Span-Div'><span className = 'Career-Table-Season-Row-Span'>{career.stat.overTimeGoals !== undefined? career.stat.overTimeGoals : 'N/A'}</span></div>
                    <div className = 'Career-Table-Season-Row-Span-Div'><span className = 'Career-Table-Season-Row-Span'>{career.stat.shots !== undefined? career.stat.shots : 'N/A'}</span></div>
                    <div className = 'Career-Table-Season-Row-Span-Div'><span className = 'Career-Table-Season-Row-Span'>{career.stat.shotPct !== undefined? career.stat.shotPct : 'N/A'}</span></div>
                </section>}):null}

                {isLoaded?<footer className = 'Career-Table-Row'>
                    <div className = 'Career-Table-Row-Highlight-Divider-Div'><span className = 'Career-Table-Row-Highlight-Span' >Career</span></div>
                    <div className = 'Career-Table-Row-Highlight-Divider-Div'></div>
                    <div className = 'Career-Table-Row-Span-Div'><span className = 'Career-Table-Row-Span'>{sumCareerStats(careerData, 'games')}</span></div>
                    <div className = 'Career-Table-Row-Span-Div'><span className = 'Career-Table-Row-Span'>{sumCareerStats(careerData, 'goals')}</span></div>
                    <div className = 'Career-Table-Row-Span-Div'><span className = 'Career-Table-Row-Span'>{sumCareerStats(careerData, 'assists')}</span></div>
                    <div className = 'Career-Table-Row-Span-Div'><span className = 'Career-Table-Row-Span'>{sumCareerStats(careerData, 'points')}</span></div>
                    <div className = 'Career-Table-Row-Span-Div'><span className = 'Career-Table-Row-Span'>{sumCareerStats(careerData, 'plusMinus')}</span></div>
                    <div className = 'Career-Table-Row-Span-Div'><span className = 'Career-Table-Row-Span'>{sumCareerStats(careerData, 'pim')}</span></div>
                    <div className = 'Career-Table-Row-Span-Div'><span className = 'Career-Table-Row-Span'>{sumCareerStats(careerData, 'powerPlayGoals')}</span></div>
                    <div className = 'Career-Table-Row-Span-Div'><span className = 'Career-Table-Row-Span'>{sumCareerStats(careerData, 'powerPlayPoints')}</span></div>
                    <div className = 'Career-Table-Row-Span-Div'><span className = 'Career-Table-Row-Span'>{sumCareerStats(careerData, 'shortHandedGoals')}</span></div>
                    <div className = 'Career-Table-Row-Span-Div'><span className = 'Career-Table-Row-Span'>{sumCareerStats(careerData, 'shortHandedPoints')}</span></div>
                    <div className = 'Career-Table-Row-Span-Div'><span className = 'Career-Table-Row-Span'>{sumCareerStats(careerData, 'gameWinningGoals')}</span></div>
                    <div className = 'Career-Table-Row-Span-Div'><span className = 'Career-Table-Row-Span'>{sumCareerStats(careerData, 'overTimeGoals')}</span></div>
                    <div className = 'Career-Table-Row-Span-Div'><span className = 'Career-Table-Row-Span'>{sumCareerStats(careerData, 'shots')}</span></div>
                    <div className = 'Career-Table-Row-Span-Div'><span className = 'Career-Table-Row-Span'>{sumCareerStats(careerData, 'shotPct').toFixed(2)}</span></div>
                </footer>:null}
        </article>
    );
} 
export default CareerStatsTable;