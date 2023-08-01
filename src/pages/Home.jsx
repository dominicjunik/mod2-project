import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { reset, storeBioData } from "../characterSlice"
import { useEffect, useState } from "react"



// make a paperdoll here 

// the name portion should be a form that saves state and goes to the redux


export default function Home() {

    ////////////////////
    // display states //
    const [displayStats, setDisplayStats] = useState({})
    const [bio, setBio] = useState({
        name: '',
        age: '',
        hp: 0,
        nameLock: false,
        ageLock: false,        
    })


    const navigate = useNavigate()
    // importing the user selected options from redux to display
    const {step, classData, raceData, statsData, alignmentData, backgroundData, bioData} = useSelector(state => state.char)
   
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
        
        // loop over each index in the bonus stats ARRAY
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
                    // Becuse this is just a display we can add the values together with text formatting into a string
                    display[stat] = `${total}(+${bonus})`
                    // console.log(display)                   
                }
            }
        }
        
        setDisplayStats(display)   
    }

    // takes the array of language objects, pushes the names together into a new array and then joins them with a comma
    function displayLang(){
        let names = []
        for(const lang in raceData.languages){            
            // console.log(raceData.languages[lang].name)
            names.push(raceData.languages[lang].name)
        }return names.join(', ')
    }

    //D&D has modifiers attached to each stat ths returns the value based on the input
    function modStats(num){
        if(num === 1) return -5
        else if(num < 4) return -4
        else if(num < 6) return -3
        else if(num < 8) return -2
        else if(num < 10) return -1
        else if(num < 12) return 0
        else if(num < 14) return 1
        else if(num < 16) return 2
        else if(num < 18) return 3
        else if(num < 20) return 4
        else return 0        
    }

    // displays the hp after calculating it
    function calcHp(){        
        if(typeof displayStats.con === "string" && classData.hit_die){
            console.log('ypo')
            // split the display mod
            let numArr = displayStats.con.split('(+')
            // take the total, numArr[0], and then caculate its modifier
            let modifier = modStats(Number(numArr[0]))
            // calc hp which is con modifier + hitdie
            let hitpoints = modifier + classData.hit_die
            console.log(hitpoints,modifier, classData.hit_die)
            setBio({...bio, hp: hitpoints})

            localStorage.setItem('bio', JSON.stringify(bio))
        } else if (displayStats.con > 0){
            let modifier = modStats(displayStats.con)
            let hitpoints = modifier + classData.hit_die
            setBio({...bio, hp: hitpoints})
            localStorage.setItem('bio', JSON.stringify(bio))            
        }
        
    }
    // checking if display stats (ability scores) or classData (class selected) have changed to run the function
    useEffect(()=>{calcHp()},[classData, displayStats])

    //////////////////////////////////////////////
    // render functions stolen from other pages //
    // slightly modified so i cant export
    function renderTraits(){
        // prevents the page from breaking if theres no data        
        if(raceData.traits  === undefined){return}
        return ( raceData.traits.map( (trait)=> <Link key={trait.index} to={`/traits/${trait.index}`} state={{data: trait.url}}><div key={trait.index}>{trait.name}</div> </Link>))
    }

    // i tried conditionally rendering INSIDE this function because all classes have starting equipment but they might not all have options
    function renderStartingEquipment(){  
        // prevents the page from breaking if theres no data  
        if(classData.starting_equipment  === undefined){return}
        return (
            <div>
            {classData.starting_equipment.map((option)=> <div key={option.equipment.index}> {option.quantity} {option.equipment.name} </div> )}
            A choice of:
            {
            classData.starting_equipment_options.length > 0 ? classData.starting_equipment_options.map((option)=><div key={option.desc}>-{option.desc}</div>) : null
            }
           
            </div>
        )
    }


    ///////////////
    // bio input //
    // this handles the change in the input fields and saves them to the state
    function handleChange(event) {
        // setInput(event.target.value);
        // called computer property name
        let key = event.target.id;
        setBio({ ...bio, [key]: event.target.value });
        // localStorage.setItem('bio', JSON.stringify(bio))
    }
    // saves the bio info to the local storage
    function storedBio(){
        let storedBio = localStorage.getItem('bio')
        let storedBioParsed = JSON.parse(storedBio)
        if (storedBioParsed) {
            setBio(storedBioParsed)
        } 
    }
    // on page load -> check storage and set the fields to the old values    
    useEffect(()=>{storedBio()},[])

    /////////////////
    // name hijinx //
    // this is to remove the input bar and add the name to the page
    function handleSubmit(event){
        console.log('hit the submit function')
        event.preventDefault()
        console.log(event.target.id)
        let obj = {}
        if (event.target.id === 'name') {
            obj = {...bio, nameLock: true}
            setBio(obj)            
            console.log('got to logic, name')
        }
        else if( event.target.id === 'age'){
            obj = {...bio, ageLock: true}
            setBio(obj)
            console.log('got to logic, age')
        }
        
        console.log(bio)
        dispatch(storeBioData(obj))
        localStorage.setItem('bio', JSON.stringify(obj))
    }    


   
    return (
        <div className="">
            <h1>D&D API CHARACTER CREATOR</h1>

            {step.race && step.class && step.abilityScore && step.alignment && step.background ? null : (step.race ? <Link to={journey()}> <div>NEXT STEP</div></Link> : <Link to="/races"> <div>START</div></Link>)}
            
            <h2>Your Character:</h2>

            <div>
                <form onSubmit={handleSubmit} id='name'>
                    <div>                        
                        {bioData.nameLock === true ? `Name: ${bioData.name}` : <><input id="name" value={bio.name} onChange={handleChange} placeholder="name" /> <button type="submit" id='name'>+</button></>}
                    </div>
                </form>
                <form onSubmit={handleSubmit} id='age'>
                    <div>
                      {bioData.ageLock === true ? `Age: ${bioData.age}` : <><input id="age" value={bio.age} onChange={handleChange} placeholder="age"/> <button type="submit">+</button></>}
                    </div>
                </form>           
            </div>

            <div>
                {raceData.name} {classData.name}
            </div>

            <div>
                CHA: {displayStats.cha} CON: {displayStats.con} DEX: {displayStats.dex}  INT: {displayStats.int} STR: {displayStats.str}  WIS: {displayStats.wis}
            </div>

            <div>
                Speed: {raceData.speed}ft
            </div>

            <div>
                Size: {raceData.size}
            </div>

            <div>
                Languages: {raceData.languages ? displayLang() : null}
            </div>

            <div>
                Hitpoints: {bio.hp} / {bio.hp}
            </div>
            
            <div>
                {alignmentData.name} ({alignmentData.abbreviation})
            </div>

            <div>
                {backgroundData.name}
            </div>

            <div>
                 {classData.spellcasting ? `Spellcasting (${classData.spellcasting.spellcasting_ability.name})`  : null}
            </div>

            <div>
                {classData.saving_throws ? `Saving Throws: ${classData.saving_throws[0].name} + ${classData.saving_throws[1].name}` : null}
            </div>

            <div>                  
                <div>
                    <div>
                        Traits:
                    </div>
                    <div>
                        {raceData ? renderTraits() : null}
                    </div>
                </div>
            </div>  

            <div>                  
                <div>
                    <div>
                        Equipment:
                    </div>
                    <div>
                        {classData ? renderStartingEquipment() : null}
                    </div>
                </div>
            </div>  

            <button onClick={(()=>{dispatch(reset())})}>reset</button>
            
            
            
        </div>
    )
}

