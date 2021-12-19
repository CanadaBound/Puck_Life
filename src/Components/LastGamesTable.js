import { useEffect, useState } from 'react';
import '../CSS/LastGamesTable.css';
import {GetLastFiveGames} from './APIInteractionFunctions.js';

function LastGamesTable({playerID}){
    var [fiveGames, setFiveGames] = useState([]);
    var [isLoaded, setIsLoaded] = useState(false);

    //This useEffect runs a function from the api helper file that retrieves the last gives games, the promise is then resolved
    //and we set the state to the value of the response. Which then generates the table.
    useEffect(()=>{
        GetLastFiveGames(playerID).then(res => setFiveGames(res.data.stats[0].splits));
    }, [playerID])

    useEffect(()=>{
        fiveGames.length >0 ? setIsLoaded(true): setIsLoaded(false);
    }, [fiveGames])

    return(
        <article className = 'Last-Games-Stats'>
            <header className = 'Last-Games-Table-Header'>
                <div className = 'Last-Games-Table-Team-Header-Span-Div'><span className = 'Last-Games-Table-Header-Span'>Opponent</span></div>
                <div className = 'Last-Games-Table-Team-Header-Span-Div'><span className = 'Last-Games-Table-Header-Span'>Date</span></div>
                <div className = 'Last-Games-Table-Header-Span-Div'><span className = 'Last-Games-Table-Header-Span'>G</span></div>
                <div className = 'Last-Games-Table-Header-Span-Div'><span className = 'Last-Games-Table-Header-Span'>A</span></div>
                <div className = 'Last-Games-Table-Header-Span-Div'><span className = 'Last-Games-Table-Header-Span'>P</span></div>
                <div className = 'Last-Games-Table-Header-Span-Div'><span className = 'Last-Games-Table-Header-Span'>+/-</span></div>
                <div className = 'Last-Games-Table-Header-Span-Div'><span className = 'Last-Games-Table-Header-Span'>PIM</span></div>
                <div className = 'Last-Games-Table-Header-Span-Div'><span className = 'Last-Games-Table-Header-Span'>PPG</span></div>
                <div className = 'Last-Games-Table-Header-Span-Div'><span className= 'Last-Games-Table-Header-Span'>SHG</span></div>
                <div className = 'Last-Games-Table-Header-Span-Div'><span className = 'Last-Games-Table-Header-Span'>S</span></div>
                <div className = 'Last-Games-Table-Header-Span-Div'><span className = 'Last-Games-Table-Header-Span'>Shifts</span></div>
                <div className = 'Last-Games-Table-Header-Span-Div'><span className = 'Last-Games-Table-Header-Span'>TOI</span></div>
            </header>
            {isLoaded?fiveGames.slice(0,5).map( games => {
            return <section key = {games.team.id+games.opponent.id+games.date} className = 'Last-Games-Table-Row'>
                <div className = 'Last-Games-Table-Row-Highlight-Team-Div'><span className = 'Last-Games-Table-Row-Highlight-Span' >{games.opponent.name}</span></div>
                <div className = 'Last-Games-Table-Row-Highlight-Team-Div'><span className = 'Last-Games-Table-Row-Highlight-Span'>{games.date}</span></div>
                <div className = 'Last-Games-Table-Row-Span-Div'><span className = 'Last-Games-Table-Row-Span'>{games.stat.goals}</span></div>
                <div className = 'Last-Games-Table-Row-Span-Div'><span className = 'Last-Games-Table-Row-Span'>{games.stat.assists}</span></div>
                <div className = 'Last-Games-Table-Row-Span-Div'><span className = 'Last-Games-Table-Row-Span'>{games.stat.points}</span></div>
                <div className = 'Last-Games-Table-Row-Span-Div'><span className = 'Last-Games-Table-Row-Span'>{games.stat.plusMinus}</span></div>
                <div className = 'Last-Games-Table-Row-Span-Div'><span className = 'Last-Games-Table-Row-Span'>{games.stat.pim}</span></div>
                <div className = 'Last-Games-Table-Row-Span-Div'><span className = 'Last-Games-Table-Row-Span'>{games.stat.powerPlayGoals}</span></div>
                <div className = 'Last-Games-Table-Row-Span-Div'><span className = 'Last-Games-Table-Row-Span'>{games.stat.shortHandedGoals}</span></div>
                <div className = 'Last-Games-Table-Row-Span-Div'><span className = 'Last-Games-Table-Row-Span'>{games.stat.shots}</span></div>
                <div className = 'Last-Games-Table-Row-Span-Div'><span className = 'Last-Games-Table-Row-Span'>{games.stat.shifts}</span></div>
                <div className = 'Last-Games-Table-Row-Span-Div'><span className = 'Last-Games-Table-Row-Span'>{games.stat.timeOnIce}</span></div>
            </section>}): null}
        </article>
    );
} export default LastGamesTable;