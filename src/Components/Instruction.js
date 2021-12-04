import '../CSS/Instruction.css';

function Instruction(){



return(

    <div className = 'Instruction-Container'>
        <div className = 'Upper-Arrow-SVG'>
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="75">
                <g fill="none" stroke="#9a9c9a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10">
                    <path d="M9.748 73.448c-5.466-9.41-12.212-20.124.532-26.994 9.499-5.12 21.629-3.752 30.447 1.811 8.999 5.677 16.714 14.104 28.574 9.748 18.443-6.774 19.853-35.315 22.447-50.898"/>
                    <path d="M97.003 12.678c-2.956-3.242-2.408-7.53-4.574-11.126-1.822 2.634-5.759 7.808-8.893 9.052"/>
                </g>
            </svg>
        </div>
        <div className = 'Upper-Instruction-Wording-Container'>
            <p className = 'Upper-Instruction-Wording'>
                Use these to move between different stats for different positions.
            </p>
        </div>
        <div className = 'Lower-Instruction-Container'>
            <div className = 'Lower-Arrow-SVG'>
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="55">
                <g fill="none" stroke="#9a9c9a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10">
                    <path d="M56.792 33.373c1.24 7.471-5.059 15.454-12.248 17.293-19.737 5.05-30.898-28.609-36.752-41.293"/>
                    <path d="M15.281 10.326c-4.28-.965-6.285-4.796-10.118-6.504.012 3.201-.255 9.697-2.112 12.511"/>
                </g>
            </svg>
            </div>
            <div className = 'Lower-Instruction-Wording-Container'>
                <p className = 'Lower-Instruction-Wording'>
                    Scroll and select one or more teams to load their stats
                </p>
            </div>
        </div>
    </div>

);

}

export default Instruction;