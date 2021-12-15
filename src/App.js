
import './App.css';
import LandingPage from './Components/LandingPage';
import useLocalStorage from 'use-local-storage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdditionalStatsPage from './Components/AdditionalStatsPage';


function App() {
	const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

	return (
		<BrowserRouter>
			<div className="App" data-theme = {theme}>
				{/* <LandingPage theme = {theme} setTheme={setTheme}/> */}
				<Routes>
          			<Route path="/" element={<LandingPage theme = {theme} setTheme={setTheme}/>} />
          			<Route path="/Player/:id" element = {<AdditionalStatsPage theme = {theme} setTheme={setTheme}/>}/>
        		</Routes>
			</div>
		</BrowserRouter>
	 
		
	);
}

export default App;
