import axios from "axios";

//Gets data for an individual player, with the ID being the unique ID to the player
export async function GetPlayerData(ID){

    return await axios.get(`https://statsapi.web.nhl.com/api/v1/people/${ID}`);
}
//Gets standings data for each division of the NHL.
export async function GetTeamStandings(){

    return await axios.get(`https://statsapi.web.nhl.com/api/v1/standings`);
}

//Gets the photos of an individual player, it requires both first and last name to work correctly.
export async function GetPlayerPhotos(Name){
    return await axios.get(`https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${Name}`)
}

//Gets the career stats for the individual player (will return all available data for their career not just NHL)
export async function GetCareerData(ID){
    return await axios.get(`https://statsapi.web.nhl.com/api/v1/people/${ID}/stats?stats=yearByYear`)
}
//Gets the gamelog for the individual player will show all their games past and present for this season. This later gets trimmed to 5 records
export async function GetLastFiveGames(ID){
    return await axios.get(`https://statsapi.web.nhl.com/api/v1/people/${ID}/stats?stats=gameLog`)
}

//This function turns a true or false statement that is stored in the data next to captain/alternate/rookie and returns the actual title
export function createOtherTitles(captain ,alternate, rookie){
    if(captain){
        return 'Captain'
    }
    if(alternate){
        return 'Alternate'
    }
    if(rookie){
        return 'Rookie'
    }else{
        return ' '
    }
}

//This function inserts a - in between 2 years for a season as the data from the API misses this (API Data: 20212022, return data: 2021-2022)
export function formatDate(date){
    var formattedDate = date.slice(0,4) + '-' + date.slice(4);
    return formattedDate
}

//This functions totals up the season stats for a player. There are 14 types of stats. Some have not been defined in the data due to the team not being in NHL.
//So first the function filters the career data that was passed to it to make sure it doesn't include any undefined data.
//Then it runs a reducer and totals the individual stat.
export function sumCareerStats(careerData, statType){
    let initialValue = 0;
    switch(statType){
        case 'games':
            return careerData.filter(obj => obj.stat.games!== undefined).reduce((prevValue, currentValue)=> prevValue+currentValue.stat.games, initialValue);
        case 'goals':
            return careerData.filter(obj => obj.stat.goals!== undefined).reduce((prevValue, currentValue)=> prevValue+currentValue.stat.goals, initialValue);
        case 'assists':
            return careerData.filter(obj => obj.stat.assists!== undefined).reduce((prevValue, currentValue)=> prevValue+currentValue.stat.assists, initialValue);
        case 'points':
            return careerData.filter(obj => obj.stat.points!== undefined).reduce((prevValue, currentValue)=> prevValue+currentValue.stat.points, initialValue);
        case 'plusMinus':
            return careerData.filter(obj => obj.stat.plusMinus!== undefined).reduce((prevValue, currentValue)=> prevValue+currentValue.stat.plusMinus, initialValue);
        case 'pim':
            return careerData.filter(obj => obj.stat.pim!== undefined).reduce((prevValue, currentValue)=> prevValue+parseInt(currentValue.stat.pim), initialValue);
        case 'powerPlayGoals':
            return careerData.filter(obj => obj.stat.powerPlayGoals!== undefined).reduce((prevValue, currentValue)=> prevValue+currentValue.stat.powerPlayGoals, initialValue);
        case 'powerPlayPoints':
            return careerData.filter(obj => obj.stat.powerPlayPoints!== undefined).reduce((prevValue, currentValue)=> prevValue+currentValue.stat.powerPlayPoints, initialValue);
        case 'shortHandedGoals':
            return careerData.filter(obj => obj.stat.shortHandedGoals!== undefined).reduce((prevValue, currentValue)=> prevValue+currentValue.stat.shortHandedGoals, initialValue);
        case 'shortHandedPoints':
            return careerData.filter(obj => obj.stat.shortHandedPoints!== undefined).reduce((prevValue, currentValue)=> prevValue+currentValue.stat.shortHandedPoints, initialValue);
        case 'gameWinningGoals':
            return careerData.filter(obj => obj.stat.gameWinningGoals!== undefined).reduce((prevValue, currentValue)=> prevValue+currentValue.stat.gameWinningGoals, initialValue);
        case 'overTimeGoals':
            return careerData.filter(obj => obj.stat.overTimeGoals!== undefined).reduce((prevValue, currentValue)=> prevValue+currentValue.stat.overTimeGoals, initialValue);
        case 'shots':
            return careerData.filter(obj => obj.stat.shots!== undefined).reduce((prevValue, currentValue)=> prevValue+currentValue.stat.shots, initialValue);
        case 'shotPct':
            return careerData.filter(obj => obj.stat.shotPct!== undefined).reduce((prevValue, currentValue)=> prevValue+currentValue.stat.shotPct, initialValue)/careerData.filter(obj => obj.stat.shotPct!== undefined).length;
        default:
            return 0;
    }

}

//This function gets the YIQ number which is the contrast between foreground color and background color for the banner on additional stats page
//It picks the most reasonable font colour when compared to the background. It's either black or white.
export function GetContrastYIQ(hexcolor){
    hexcolor = hexcolor.replace("#", "");
    var r = parseInt(hexcolor.substr(0,2),16);
    var g = parseInt(hexcolor.substr(2,2),16);
    var b = parseInt(hexcolor.substr(4,2),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'black' : 'white';
}

//This function is used to display to the user the relevant stats when they hover over the name or stat of a player. Player position 1 is a Goalie, 0 and 2 mean skater and defenceman.
//The reason numbers are used for the stats across the website is because goalies have different stats showing when compared to non-goalie players. 1 is Points (Goals against average for goalies)
//2 is Goals (Save percentage for goalies) and 3 is Assists (Shutouts for goalies).
export function SelectCorrectStats(playerStats, selectedStat, playerPosition){
    
    var playerStatsCopy;
    if(playerPosition !== 1){
        // eslint-disable-next-line default-case
        switch(selectedStat){
            case 1:
                playerStatsCopy = playerStats.sort((a,b) => b.Points - a.Points ).splice(0,1);
                return playerStatsCopy[0]
            case 2:
                playerStatsCopy = playerStats.sort((a,b) => b.Goals - a.Goals ).splice(0,1);
                return playerStatsCopy[0]
            case 3:
                playerStatsCopy = playerStats.sort((a,b) => b.Assists - a.Assists ).splice(0,1);
                return playerStatsCopy[0]
        }
    }else{
        // eslint-disable-next-line default-case
        switch(selectedStat){
            case 1:
                playerStatsCopy = playerStats.sort((a,b) => a.GAA - b.GAA ).splice(0,1);
                return playerStatsCopy[0]
            case 2:
                playerStatsCopy = playerStats.sort((a,b) => b.SavePercentage - a.SavePercentage ).splice(0,1);
                return playerStatsCopy[0]
            case 3:
                playerStatsCopy = playerStats.sort((a,b) => b.Shutouts - a.Shutouts ).splice(0,1);
                return playerStatsCopy[0]
        
        }
    }
     
       
}



