import '../CSS/NavBar.css';
import {IoMoonSharp, IoSunnySharp} from 'react-icons/io5';
import { useNavigate, Link } from 'react-router-dom';



function NavBar({theme, setTheme}){
  
    const navigate = useNavigate();

    function toggleTheme(){
        
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }

    function handleEnter(e){
        if(e.key === 'Enter'){
            navigate('/');
        }
    }


    return(
        <header className = 'NavBar-Container'>
            <div className = 'Logo'>
                <Link tabIndex={0} to='/'><h1  className = 'H1-Logo'>Puck Life</h1></Link>
            </div>
            <nav className = 'NavBar-Links' >

                <button className = 'Filter-Icon' onClick={()=> toggleTheme()}>
                    {theme === 'dark' ? <IoSunnySharp tabIndex={0} className = 'Sunny-Icon' aria-label = "Click here to switch theme to light" size = {24} color = 'white'/>: <IoMoonSharp tabIndex={0} className = 'Moon-Icon' aria-label = "Click here to switch theme to dark" size = {24} color = 'black'/>}

                </button>
            </nav>
            
        </header>
    );

}

export default NavBar;