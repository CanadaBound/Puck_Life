import { useState, useEffect } from "react";
import '../CSS/DivisionDetails.css';

import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';

function DivisionCardLayout() {

    


    var [division, setDivision] = useState('');
    var [rankingArr, setRankingArr] = useState([]);
    var [imageURLDiv, setImageURLDiv] = useState('');
    var [divisionNo, setDivisionNo] = useState(0);
    

    function moveDivision(direction){
        if(direction === '+' && divisionNo !== 3){
            setDivisionNo(divisionNo+1);
            console.log(divisionNo);
        }else if (direction === '+' && divisionNo == 3){
            setDivisionNo(0);
            console.log(divisionNo);
        }else if(direction === '-' && divisionNo !== 0){
            setDivisionNo(divisionNo-1);
            console.log(divisionNo);
        }else {
            setDivisionNo(3);
            console.log(divisionNo);
        }
    }

    function selectImage(division){
        switch(division){
            case 0:
                setImageURLDiv('https://content.sportslogos.net/logos/1/485/full/7146__nhl_all-star_game-team-2020.png');
                
                break;
            case 1:
                setImageURLDiv('https://content.sportslogos.net/logos/1/485/full/4702__nhl_all-star_game-team-2020.png');
                
                break;
            case 2:
                setImageURLDiv('https://content.sportslogos.net/logos/1/485/full/8130__nhl_all-star_game-team-2020.png');
                
                break;
            case 3:
                setImageURLDiv('https://content.sportslogos.net/logos/1/485/full/8267__nhl_all-star_game-team-2020.png');
                
                break;
            default:
                setImageURLDiv('https://upload.wikimedia.org/wikipedia/en/3/3a/05_NHL_Shield.svg');
                
        }
    }
    
    useEffect(()=>{
        const axios = require('axios');
        axios.get('https://statsapi.web.nhl.com/api/v1/standings').then(res => {
        
        setDivision(res.data.records[divisionNo].division.name);
        setRankingArr(res.data.records[divisionNo].teamRecords);

        selectImage(divisionNo);
        
      
      });
    }, [divisionNo]);   

   
    

return (
<div className = 'cardLayout1'>

<div className = 'RankingDiv1'>  
    <div className = 'playerImage1'>
    {/* {(<List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        '& ul': { padding: 0 },
        [`& .active, & .${listItemClasses.root}:hover`]: {
          bgcolor: '#edebeb'
          }
      }}>
     {rankingArr.map(d => (
      <ListItem key={d.team.id} id={d.team.id} >
      <ListItemText primary ={d.team.name} secondary = {d.pointsPercentage.toFixed(3)} >
    
      </ListItemText>
          
        
        </ListItem>
     ))}
     </List> )} */}

<TableContainer style={{ maxHeight: 400 }}>
<Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Ranking</TableCell>
            <TableCell align="left">Team</TableCell>
            <TableCell align="left">P%</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rankingArr.map((d) => (
            <TableRow
              key={d.team.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {d.divisionRank}
              </TableCell>
              <TableCell align="left">{d.team.name}</TableCell>
              <TableCell align="left">{d.pointsPercentage.toFixed(3)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
        </div>  
</div>  
<div className = 'TeamPlayerImage1'>
  <div className = 'teamImage1'><img className = "teamImgTag1" src = {imageURLDiv}></img></div>
  <div className = 'TeamPlayerInfo1'>
      <div className = 'teamName1'>2021-2022 Season</div>
      <div className = 'teamName1'><MdKeyboardArrowLeft onClick= {()=>moveDivision('-')}/>{division}<MdKeyboardArrowRight onClick= {()=>moveDivision('+')}/></div>
       
  </div>
    
    
</div>


</div>
);
    }


  
  
  export default DivisionCardLayout;