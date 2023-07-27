import { useSelector } from "react-redux"
import { Link } from "react-router-dom"


// make a paperdoll here 

// the name portion should be a form that saves state and goes to the redux


export default function Home() {
    // importing the user selected options from redux to display
    const {classData, raceData} = useSelector(state => state.char)


    return (
        <div>
            <h1>D&D API WEBSITE</h1>
            <Link to="/classes">
                <div>Begin your journey</div>                
            </Link>
            <h2>Your Character:</h2>
            <div>
                {raceData.name}
            </div>
            <div>
                {classData.name}
            </div>
            
        </div>
    )
}

