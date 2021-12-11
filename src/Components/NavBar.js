import '../CSS/NavBar.css';

import {FaSearch} from 'react-icons/fa';

function NavBar(){

    return(
        <div className = 'NavBar-Container'>
            <div className = 'Logo'>
                <h1 className = 'H2-Logo'>Puck Life</h1>
            </div>
            <div className = 'NavBar-Links'>
                <div classname = 'Filter-Icon'>
                    <FaSearch aria-label = "Click here to search for teams" size = {24} color = 'white'/>
                </div>
            </div>
            
        </div>
    );

}

export default NavBar;