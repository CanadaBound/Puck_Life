import { useState } from 'react';
import {IoMoonSharp,IoSunnySharp} from 'react-icons/io';

function ThemeChange(){
	const [switchTheme, setSwitchTheme] = useState(true);
	return(
		<>
			{switchTheme ?  <IoMoonSharp/>: <IoSunnySharp/>}
		</>
		
		
	);
}
export default ThemeChange();