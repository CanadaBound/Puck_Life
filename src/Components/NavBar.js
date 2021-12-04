import '../CSS/NavBar.css';

import {FaSearch} from 'react-icons/fa';

function NavBar(){

    return(
        <div className = 'NavBar-Container'>
            <div className = 'Logo'>
                <h1 className = 'H2-Logo'>Hockey Locker Room</h1>
            </div>
            <div className = 'NavBar-Links'>
                <div classname = 'NHL-Icon'>
                    <h2 className = 'H2-NHL'>NHL</h2>
                </div>
                <div classname = 'LIIGA-Icon'>
                    <h2 className = 'H2-LIIGA'>LIIGA</h2>
                </div>
                <div classname = 'SHL-Icon'>
                    <h2 className = 'H2-SHL'>SHL</h2>
                </div>
                <div classname = 'Filter-Icon'>
                    <FaSearch size = {24} color = 'white'/>
                </div>
            </div>
            
        </div>
    );

}

export default NavBar;