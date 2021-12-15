import '../CSS/NavBar.css';
import {IoMoonSharp, IoSunnySharp} from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';



function NavBar({theme, setTheme}){
    const navigate = useNavigate();
    function toggleTheme(){
        
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }

    return(
        <div className = 'NavBar-Container'>
            <div className = 'Logo'>
                <h1 className = 'H2-Logo' onClick = {() => navigate('/')}>Puck Life</h1>
            </div>
            <div className = 'NavBar-Links'>
                <div classname = 'Filter-Icon'>
                    {theme === 'dark' ? <IoSunnySharp className = 'Sunny-Icon' onClick={()=> toggleTheme()} aria-label = "Click here to switch theme to light" size = {24} color = 'white'/>: <IoMoonSharp className = 'Moon-Icon' onClick={()=> toggleTheme()} aria-label = "Click here to switch theme to dark" size = {24} color = 'black'/>}
                </div>
            </div>
            
        </div>
    );

}

export default NavBar;