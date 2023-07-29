import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { reset } from "../characterSlice"



// make a paperdoll here 

// the name portion should be a form that saves state and goes to the redux


export default function Home() {
    const navigate = useNavigate()
    // importing the user selected options from redux to display
    const {step, classData, raceData, statsData} = useSelector(state => state.char)

    // enabling the reset button
    let dispatch = useDispatch()
    
    // this function directs the user to the next step in character creation
    // step = {race: false, class: false, abilityScore: false, alignment: false, background: false}
    function journey(){
        switch(step){
            case (step.race): useNavigate('/classes')
            
            case (step.class): return 'Next step - choose ability scores';
            case (step.abilityScore): return 'Next step - choose alignment';
            case (step.alignment): return 'Next step - choose background';
            case (step.race && step.class && step.abilityScore && step.alignment): return 'All done!!';
            default: return null
        }
    }        

    return (
        <div>
            <h1>D&D API WEBSITE</h1>
            {step.race ? <button onClick={()=>journey()}>next step</button> : <Link to="/races"> <div>'Begin character creation! click me!'</div></Link>}
            <h2>Your Character:</h2>
            <div>
                {raceData.name}
            </div>            
            <div>
                CHA: {statsData.cha} CON: {statsData.con} Dex: {statsData.dex}  INT: {statsData.int} STR: {statsData.str}  WIS: {statsData.wis}
            </div>
            <div>
                {classData.name}
            </div>
            <button onClick={(()=>{dispatch(reset())})}>reset</button>
            
            
        </div>
    )
}

