import { useSelector } from "react-redux"
import { Link } from "react-router-dom"


// make a paperdoll here 

// the name portion should be a form that saves state and goes to the redux


export default function Home() {
    // importing the user selected options from redux to display
    const {classData} = useSelector(state => state.char)


    return (
        <div>
            <h1>D&D API WEBSITE</h1>
            <Link to="/classes">
                <div>Begin your journey</div>                
            </Link>
            <div>
                Class name: {classData.name}
            </div>
        </div>
    )
}