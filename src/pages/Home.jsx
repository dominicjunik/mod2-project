import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { reset, storeBioData } from "../characterSlice"
import { useEffect, useState } from "react"
import headshot from '../assets/headshot.png'


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
        return ( raceData.traits.map( (trait)=> <Link key={trait.index} to={`/traits/${trait.index}`} state={{data: trait.url}}><div key={trait.index} className="pr-4 text-blue-700 hover:text-blueNCS font-medium">{trait.name}</div> </Link>))
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
        <div className="flex flex-col items-center">
            <h1 className="bg-secondary text-4xl m-4 rounded-md  shadow-pop-out p-3 text-orange-100">D&D API CHARACTER CREATOR</h1>

            {step.race && step.class && step.abilityScore && step.alignment && step.background ? null : (step.race ? <Link to={journey()}> <div className="bg-secondary text-4xl m-2 rounded-md  shadow-pop-out p-3 text-orange-100 hover:bg-gold hover:border-yellow-100 hover:text-yellow-100 border-double border-4 border-slate-600 transform active:scale-90 transition-transform">NEXT STEP</div></Link> : <Link to="/races"> <div className="bg-primary text-4xl m-2 rounded-md  shadow-pop-out p-3 text-white hover:bg-gold hover:border-yellow-100 hover:text-yellow-100 border-double border-4 border-slate-600 transform active:scale-90 transition-transform">START</div></Link>)}
            
    
            <div className="w-[800px] h-[600px] grid grid-cols-16 grid-rows-13 bg-parchment shadow-strongest border-gray-600 border-dotted border-4 p-2 gap-2 m-4">
            
                <div className="col-start-1 col-end-5 row-start-1 row-end-3 justify-center items-center flex bg-secondary">
                    <form onSubmit={handleSubmit} id='name' className="h-max">
                                              
                            {bioData.nameLock === true ? <p className="text-white text-2xl flex justify-center items-center">{bioData.name}</p> : <div className="flex justify-center"><input id="name" value={bio.name} onChange={handleChange} placeholder="name" className="w-4/5"></input> <button type="submit" id='name' className="col-start-5 text-white hover:text-blueNCS">+</button></div>}
                        
                    </form>
                </div>
                <div className="col-start-5 col-end-17 row-start-1 row-end-1 bg-secondary text-white pr-2 justify-end items-center flex">Hitpoints: {bio.hp} / {bio.hp}</div>
                <div className="col-span-2 text-center bg-primary flex justify-center items-center text-white font-bold">CHA</div>
                <div className="col-span-2 text-center bg-primary flex justify-center items-center text-white font-bold">CON</div>
                <div className="col-span-2 text-center bg-primary flex justify-center items-center text-white font-bold">DEX</div>
                <div className="col-span-2 text-center bg-primary flex justify-center items-center text-white font-bold">INT</div>
                <div className="col-span-2 text-center bg-primary flex justify-center items-center text-white font-bold">STR</div>
                <div className="col-span-2 text-center bg-primary flex justify-center items-center text-white font-bold">WIS</div>
                <div className="col-start-1 col-end-5 row-span-2 bg-primary justify-center items-center flex"><p className="text-slate-200 text-xl">{raceData.name} {classData.name}</p></div>
                <div className="col-span-2 row-span-2 bg-parchmentSoft flex justify-center items-center text-xl font-bold">{displayStats.cha}</div>
                <div className="col-span-2 row-span-2 bg-parchmentSoft flex justify-center items-center text-xl font-bold">{displayStats.con}</div>
                <div className="col-span-2 row-span-2 bg-parchmentSoft flex justify-center items-center text-xl font-bold">{displayStats.dex}</div>
                <div className="col-span-2 row-span-2 bg-parchmentSoft flex justify-center items-center text-xl font-bold">{displayStats.int}</div>
                <div className="col-span-2 row-span-2 bg-parchmentSoft flex justify-center items-center text-xl font-bold">{displayStats.str}</div>
                <div className="col-span-2 row-span-2 bg-parchmentSoft flex justify-center items-center text-xl font-bold">{displayStats.wis}</div>
                <div className="col-span-4 col-start-1 bg-primary justify-center items-center flex text-white">{alignmentData.name} ({alignmentData.abbreviation})</div>
                <div className="col-span-4 col-start-1 bg-primary justify-center items-center flex text-white">Size</div>
                <div className="col-span-4 col-start-1  bg-parchmentSoft flex justify-center items-center">{raceData.size}</div>
                <div className="col-start-5 col-end-17 row-start-5 bg-primary text-white pr-2 justify-center items-center flex"> {classData.spellcasting ? `Spellcasting (${classData.spellcasting.spellcasting_ability.name})`  : null}</div>
                <div className="col-start-5 col-end-17 row-start-6 bg-primary text-white pr-2 justify-center items-center flex">{classData.saving_throws ? `Saving Throws: ${classData.saving_throws[0].name} + ${classData.saving_throws[1].name}` : null}</div>
                <div className="col-span-2 col-start-1  row-span-1 bg-primary justify-center items-center flex text-white">Age</div>
                <div className="col-span-2  row-span-1 col-start-3 row-start-8 bg-primary justify-center items-center flex text-white">Speed</div>
                <div className="col-span-2  row-span-1 col-start-3 row-start-9 bg-parchmentSoft justify-center items-center flex">{raceData.speed}ft</div>
                <div className="col-span-2 col-start-1  row-span-1 bg-parchmentSoft justify-center items-center flex">
                    <form onSubmit={handleSubmit} id='age' className="h-max">                          
                        {bioData.ageLock === true ? <p className=" flex justify-center items-center">{bioData.age}</p> : <div className="flex justify-center"><input id="age" value={bio.age} onChange={handleChange} placeholder="age" className="w-2/3"></input> <button type="submit" id='name' className="col-start-5 hover:text-blueNCS">+</button></div>}           
                    </form>
                </div>
                
                <div className="col-start-5 col-end-11 row-start-7 bg-primary text-white pr-2 justify-center items-center flex">Traits</div>
                <div className="col-start-5 col-end-11 row-start-8 row-span-8 bg-parchmentSoft flex flex-col items-center justify-center"><div>{raceData ? renderTraits() : null}</div></div>
                <div className="col-start-11 col-end-17 row-start-7 bg-primary text-white pr-2 justify-center items-center flex">Equipment</div>
                <div className="col-start-11 col-end-17 row-start-8 row-span-8 bg-parchmentSoft flex flex-col items-center justify-center"><div className="p-2">{classData ? renderStartingEquipment() : null}</div></div>
                <div className="col-span-4 col-start-1 bg-primary justify-center items-center flex text-white">Background</div>
                <div className="col-span-4 col-start-1  bg-parchmentSoft flex justify-center items-center">{backgroundData.name}</div>
                <div className="col-span-4 col-start-1 bg-primary justify-center items-center flex text-white">Languages</div>
                <div className="col-span-4 col-start-1 row-span-3  bg-parchmentSoft flex justify-center items-center">{raceData.languages ? displayLang() : null}</div>
                <div className="bg-secondary col-start-1 col-end-17 flex items-center justify-end text-blueNCS pr-3">created by dominic junik</div>
                
            </div>

            <button onClick={(()=>{dispatch(reset())})} className="flex bg-primary text-3xl m-4 rounded-md  shadow-pop-out p-2 text-orange-100 hover:bg-black hover:text-white hover:border-red-500 border-double border-4 border-slate-600 align-middle transform active:scale-90 transition-transform">reset</button>
           
            
            
        </div>
    )
}

