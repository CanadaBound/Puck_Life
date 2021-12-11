import axios from "axios";


export async function GetPlayerData(ID){

    return await axios.get(`https://statsapi.web.nhl.com/api/v1/people/${ID}`);
}

export async function GetPlayerPhotos(Name){
    return await axios.get(`https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${Name}`)
}

export async function GetCareerData(ID){
    return await axios.get(`https://statsapi.web.nhl.com/api/v1/people/${ID}/stats?stats=yearByYear`)
}

export async function GetLastFiveGames(ID){
    return await axios.get(`https://statsapi.web.nhl.com/api/v1/people/${ID}/stats?stats=gameLog`)
}

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

export function formatDate(date){
    var formattedDate = date.slice(0,4) + '-' + date.slice(4);
    return formattedDate
}

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

export function GetContrastYIQ(hexcolor){
    console.log(hexcolor);
    hexcolor = hexcolor.replace("#", "");
    var r = parseInt(hexcolor.substr(0,2),16);
    var g = parseInt(hexcolor.substr(2,2),16);
    var b = parseInt(hexcolor.substr(4,2),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'black' : 'white';
}



