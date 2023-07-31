import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { reset } from "../characterSlice"
import { useEffect, useState } from "react"



// make a paperdoll here 

// the name portion should be a form that saves state and goes to the redux


export default function Home() {
    const [displayStats, setDisplayStats] = useState({})

    const navigate = useNavigate()
    // importing the user selected options from redux to display
    const {step, classData, raceData, statsData, alignmentData, backgroundData} = useSelector(state => state.char)
   
    // enabling the reset button
    let dispatch = useDispatch()
    
    // this function directs the user to the next step in character creation
    // step = {race: false, class: false, abilityScore: false, alignment: false, background: false}
    function journey(){

            if (!step.race) return('/races');     
            else if (!step.class) return('/classes'); 
            else if (!step.abilityScore) return('/ability-scores'); 
            else if (!step.alignment) return('/alignment');
            else if (!step.background) return ('/backgrounds');             
    }    
    
    ////////////////////////////////
    // adding race bonus to stats //
    ////////////////////////////////    
    // this function adds the bonus from the raceData to the statsData to display on the screen
    // local state that holds the stats display useEffect on race/ability
    useEffect(()=>{ statsDisplay()},[statsData, raceData])

    function statsDisplay(){        
        let display = {...statsData}
        // if they havent selected a race yet then we just return the ability scores
        if(!raceData.ability_bonuses){
            setDisplayStats(statsData) 
            return 
        }        
        
        // loop over each index in the bonus stats array
        for (const element of raceData.ability_bonuses){
            // loop over each stat in the stats OBJECT
            for (const stat in display){
                // check if the bonus stat is the same as the current stat in the object loop
                if (stat === element.ability_score.index){
                    // console.log(display)
                    let bonus = element.bonus
                    let currentValue = display[stat]
                    let total = currentValue + bonus
                    // console.log(stat + currentValue)
                    // console.log(stat + element.ability_score.index + bonus)
                    // console.log(total)
                    display[stat] = `${total}(+${bonus})`
                    // console.log(display)
                    // we've successfully compared the two PROPERTIES now we need to add their values together
                }
            }
        }
        
        setDisplayStats(display)   
    }

    return (
        <div>
            <h1>D&D API CHARACTER CREATOR</h1>
            {step.race && step.class && step.abilityScore && step.alignment && step.background ? null : (step.race ? <Link to={journey()}> <div>NEXT STEP</div></Link> : <Link to="/races"> <div>START</div></Link>)}
            <h2>Your Character:</h2>
            <div>
                {raceData.name}
            </div>                                  
            <div>
                CHA: {displayStats.cha} CON: {displayStats.con} DEX: {displayStats.dex}  INT: {displayStats.int} STR: {displayStats.str}  WIS: {displayStats.wis}
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
            
            
            
        </div>
    )
}

