import '../CSS/TeamCard.css';
import axios from 'axios';
import { useState, useEffect } from 'react/cjs/react.development';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TeamStatsTable from './TeamStatsTable';

function TeamCardLayout({teamName, teamStatsID}){

    const teamURLPlaceholder = `https://www.thesportsdb.com/api/v1/json/2/searchteams.php?t=${teamName}`;
    const teamDataURLPlaceholder = `https://statsapi.web.nhl.com/api/v1/teams/${teamStatsID}`;
    var [teamImgURL, setTeamImgURL] = useState('');
    var [teamData, setTeamData] = useState([]);
    var [venueData, setVenueData] = useState([]);

    var teamStatsURLPlaceholder = `https://statsapi.web.nhl.com/api/v1/teams/${teamStatsID}/stats`;
    
    var [teamStats, setTeamStats] = useState([]);
    var [teamRanking, setTeamRanking] = useState([]);

    useEffect(() => {
        
        axios.get(teamStatsURLPlaceholder).then(res => {
             
        setTeamStats(res.data.stats[0].splits[0].stat);
        setTeamRanking(res.data.stats[1].splits[0].stat);
        

      });
        
      

    }, [teamName]);



    useEffect(()=>{
        axios.get(teamURLPlaceholder).then(res => { 
        setTeamImgURL(res.data.teams[0].strTeamBadge);
        
      });

      
        
    }, [teamStatsID])

    useEffect(()=>{
        axios.get(teamDataURLPlaceholder).then(res => { 
            setTeamData(res.data.teams[0]);
            setVenueData(res.data.teams[0].venue);
            
          });
    }, [teamName]);
    
   

  
return (
    <div className = 'cardLayout'>
            <div className = 'dataTable'>
            <div className = 'dataTable'>
        <div className = 'seasonRecordContainer'>
            <p>Season: 2021-2022</p>
            <p className = 'recordLabel'>Record:</p>
            <p className = 'recordData'>{teamStats.gamesPlayed}-{teamStats.wins}-{teamStats.losses}-{teamStats.ot}</p>
        </div>
       <div>
        {/* <TableContainer style={{ maxHeight: 300 }}>
            <Table>                     
                <TableBody>

                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                            Games Played
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {teamStats.gamesPlayed}
                        </TableCell>
                        <TableCell component="th" scope="row">

                        </TableCell>
                    </TableRow>

                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                            Wins
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {teamStats.wins}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {teamRanking.wins}
                        </TableCell>
                    </TableRow>

                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                            Loss
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {teamStats.losses}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {teamRanking.losses}
                        </TableCell>
                    </TableRow>

                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                            OT
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {teamStats.ot}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {teamRanking.ot}
                        </TableCell>
                    </TableRow>

                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                            Goals (per game)
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {teamStats.goalsPerGame.toFixed(1)}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {teamRanking.goalsPerGame}
                        </TableCell>
                    </TableRow>

                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                            Goals Against (per game)
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {teamStats.goalsAgainstPerGame.toFixed(1)}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {teamRanking.goalsAgainstPerGame}
                        </TableCell>
                    </TableRow>

                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                            PP Goals
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {teamStats.powerPlayGoals}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {teamRanking.powerPlayGoals}
                        </TableCell>
                    </TableRow>

                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                            PP Goals Against
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {teamStats.powerPlayGoalsAgainst}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {teamRanking.powerPlayGoalsAgainst}
                        </TableCell>
                    </TableRow>

                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                            PK%
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {teamStats.penaltyKillPercentage}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {teamRanking.penaltyKillPercentage}
                        </TableCell>
                    </TableRow>

                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                            Shots (per game)
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {teamStats.shotsPerGame.toFixed(1)}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {teamRanking.shotsPerGame}
                        </TableCell>
                    </TableRow>

                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                            Shots Allowed (per game)
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {teamStats.shotsAllowed.toFixed(1)}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {teamRanking.shotsAllowed}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
         </TableContainer> */}
                    
        </div>
        </div>
            </div>

          <div className = 'ImageTeam'>  
              <div className = 'teamImage'><img className = "teamImageTag" src={teamImgURL}></img></div>  
            
         
            <div className = 'TeamInfo'>
                <div className = 'teamNameContainer'><p className = "teamNameFont"></p>{teamName}</div>

                <div className = 'foundedLocationContainer'>
                    <div className = 'labelContainer'>
                        <p className = "foundedLabel">Founded:</p>
                        <p className = "locationLabel">Location:</p>
                        <p className = 'arenaLabel'>Arena:</p>
                    </div>
                    <div className = 'dataContainer'>
                        <p className = "foundedFont">{teamData.firstYearOfPlay}</p>
                        <p className = "locationFont">{teamData.locationName}</p>
                        <p className = 'arenaFont'>{venueData.name}</p>
                    </div>
                    
                </div>  
            </div>
              </div>


              
    </div>

    
          
      );
           
 
 
}
export default TeamCardLayout;
