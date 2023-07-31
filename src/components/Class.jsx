import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { useDispatch } from "react-redux"
import { storeClassData, completeStep } from "../characterSlice"


export default function Class(){

    //this is used to save the data should the user press confirm on this page
    const dispatch = useDispatch()
        

    // this gets state from the previous page that was linked here
    const location = useLocation()
    const { data } = location.state

    // this is to save the data from the API 
    const [character, setCharacter] = useState()

    // this is to enable the back button
    const navigate = useNavigate()



    // custom fetch hook to handle this functio across multiple pages
    // fetching api data function
    async function fetchIndividaul(){

        const url = `https://www.dnd5eapi.co${data}`
  
        try{
          const response = await axios.get(url)
          console.log(response.data)
          setCharacter(response.data)
          
        }
        catch{
          console.log(error)
        }
        
    }
    

    // on page load retrieve data from api
    useEffect(()=>{
        fetchIndividaul()      
    },[])

    // saves the character data into the redux global state and also into the local storage
    function selectClass(){        
        dispatch(storeClassData(character))
        localStorage.setItem('classData', JSON.stringify(character))
    }

    function renderSavingThrows(){
        return (
            character.saving_throws.map((save)=>(<div key={save.index}><Link key={save.name} to={`/ability-scores/${save.index}`} state={{data: save.url}}>{save.name}</Link></div>))
        )
    }

    // i tried conditionally rendering INSIDE this function because all classes have starting equipment but they might not all have options
    function renderStartingEquipment(){   
        return (
            <div>
            {character.starting_equipment.map((option)=> <div key={option.equipment.index}> {option.quantity} {option.equipment.name} </div> )}
            A choice of:
            {
            character.starting_equipment_options.length > 0 ? character.starting_equipment_options.map((option)=><div key={option.desc}>-{option.desc}</div>) : null
            }
           
            </div>
        )
    }

    function renderProficiencies(){
        return(character.proficiencies.map((prof)=> <li key={prof.index}>{prof.name}</li>))
    }

    // attempting to make this function more readable by saving stuff in variables first
    function renderMagic(){
        let spells = character.spellcasting.info
        let type = character.spellcasting.spellcasting_ability
         

        return(
            <div>
                Spellcasting ({type.name}):
                {spells.map((type)=>(<div key={type.name}>{type.name}: <br/> {type.desc.length > 1 ? type.desc.join(' ') : type.desc[0]}</div>))}
            </div>
        )
    }
        

    // displays the data for the chosen character class
    function displayCharacter() {
        return(
            <div>
                <div>
                    <h1>{character.name}</h1>
                    <div>Hit dice: {character.hit_die}</div>
                    <div>
                        <div>Proficiencies:</div>
                        <ul>
                            {renderProficiencies()}
                        </ul>                    
                    </div> 
                    <div>
                        Saving Throws: <br />
                        {renderSavingThrows()}
                    </div>
                    <div>
                        Starting Equipment: <br/>
                        {renderStartingEquipment()}
                    </div>
                    <div>
                        {character.spellcasting ? renderMagic() : null}
                    </div>

                </div>
                     
                <div>
                    <button onClick={()=>navigate(-1)}>Back</button>                    
                    <button onClick={()=> { 
                        selectClass()
                        dispatch(completeStep('class'))
                        navigate('/')
                    }}>
                            Confirm
                    </button>
                </div>
            </div>
        )
    }


    return(
        character ? displayCharacter() : <div>loading...</div>
        
    )
    // here we should pass down the url from the previous object as a prop as well as the name
    // with these we can render the data about the class and then have a select or a back button
    // when they confirm take them to the next step in character creation
    // back takes you to the class list page
}


