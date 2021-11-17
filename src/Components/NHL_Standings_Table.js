import axios from "axios";

function NHL_Standings_Table() {

function getTeamData(){
    axios.get('https://statsapi.web.nhl.com/api/v1/standings')
    .then(function(response){
        console.log(response);
    });
}
return (
    <p></p>
    );
  }
  
  export default NHL_Standings_Table;