import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { reset } from "../characterSlice"
import { useEffect, useState } from "react"



// make a paperdoll here 

// the name portion should be a form that saves state and goes to the redux


export default function Home() {
    const [displayStats, setDisplayStats] = useState()

    const navigate = useNavigate()
    // importing the user selected options from redux to display
    const {step, classData, raceData, statsData, alignmentData, backgroundData} = useSelector(state => state.char)

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
    
    ////////////////////////////////
    // adding race bonus to stats //
    ////////////////////////////////
    // currently broken  //
    ///////////////////////
    
    // this function adds the bonus from the raceData to the statsData to display on the screen
    
    // this is a bad use effect but im not sure how to update the page
    // useEffect(()=>{setDisplayStats(statsData)},[statsData])
    function statsDisplay(){
        let display = {...statsData}

        // loop over each stat in the stats OBJECT
        for (const stat in display){
            // loop over each index in the bonus stats array
            for (const element of raceData.ability_bonuses){
                    // check if the bonus stat is the same as the current stat in the object loop
                    if (stat === element.ability_score.index){
                        console.log(display)
                        let bonus = element.bonus
                        let currentValue = display[stat]
                        let total = currentValue + bonus
                        console.log(stat + currentValue)
                        console.log(stat + element.ability_score.index + bonus)
                        console.log(total)
                        display[stat] = total
                        console.log(display)
                        // we've successfully compared the two PROPERTIES now we need to add their values together
                    }
            }
        }

        setDisplayStats(display)
            
        return (
            <div>
                CHA: {display.cha} CON: {display.con} DEX: {display.dex}  INT: {display.int} STR: {display.str}  WIS: {display.wis}              
            </div>
        )
    }

    return (
        <div>
            <h1>D&D API WEBSITE</h1>
            {step.race ? <button onClick={()=>journey()}>next step</button> : <Link to="/races"> <div>'Begin character creation! click me!'</div></Link>}
            <h2>Your Character:</h2>
            <div>
                {raceData.name}
            </div>
            {false ? setDisplayStats() : null}                       
            <div>
                CHA: {statsData.cha} CON: {statsData.con} DEX: {statsData.dex}  INT: {statsData.int} STR: {statsData.str}  WIS: {statsData.wis}
            </div>            
            <div>
                {classData.name}
            </div>
            <div>
                {alignmentData.name}
            </div>
            <div>
                {backgroundData.name}
            </div>
            <button onClick={(()=>{dispatch(reset())})}>reset</button>
            <button onClick={()=>statsDisplay()}>test stat display</button>
            
            
        </div>
    )
}

