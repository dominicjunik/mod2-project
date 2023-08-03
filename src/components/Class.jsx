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
            character.saving_throws.map((save)=>(<div key={save.index}><Link key={save.name} to={`/ability-scores/${save.index}`} state={{data: save.url}} className=" text-blue-700 hover:text-blueNCS font-medium">{save.name}</Link></div>))
        )
    }

    // i tried conditionally rendering INSIDE this function because all classes have starting equipment but they might not all have options
    function renderStartingEquipment(){   
        return (
            <div>
            {character.starting_equipment.map((option)=> <div key={option.equipment.index}> {option.quantity} {option.equipment.name} </div> )}
            <p className="bg-primary text-white pl-1">A choice of:</p>
            {
            character.starting_equipment_options.length > 0 ? character.starting_equipment_options.map((option)=><div key={option.desc}>-{option.desc}</div>) : null
            }
           
            </div>
        )
    }

    function renderProficiencies(){
        return(character.proficiencies.map((prof)=> <li key={prof.index} >{prof.name}</li>))
    }

    // attempting to make this function more readable by saving stuff in variables first
    function renderMagic(){
        let spells = character.spellcasting.info
        let type = character.spellcasting.spellcasting_ability
         

        return(
            <div >
                <p className="bg-secondary text-white pl-1">Spellcasting ({type.name}):</p>
                {spells.map((type)=>(<div key={type.name}><p className="bg-primary text-white pl-1">{type.name}:</p> {type.desc.length > 1 ? type.desc.join(' ') : type.desc[0]}</div>))}
            </div>
        )
    }
        

    // displays the data for the chosen character class
    function displayCharacter() {
        return(
            <div className="flex flex-col items-center">
                <h1 className="bg-secondary text-4xl m-4 rounded-md  shadow-pop-out p-3 text-orange-100">{character.name}</h1>
                <div className="flex items-start justify-center">
                <div className="flex bg-parchment shadow-strongest m-4 p-2 text-xl border-gray-600 border-dotted border-4 flex-wrap flex-col">                    
                        <p className="bg-primary text-white pl-1">Hit dice:</p>
                        <p>{character.hit_die}</p>                       
                        <p className="bg-primary text-white pl-1">Proficiencies:</p>
                        <ul>
                            {renderProficiencies()}
                        </ul>                
                        <p className="bg-primary text-white pl-1">Saving Throws:</p>
                        {renderSavingThrows()}                                               
                        <p className="bg-primary text-white pl-1">Starting Equipment:</p> 
                        {renderStartingEquipment()}
                                        
                    </div>
                    
                    {character.spellcasting ? <div className="flex bg-parchment w-1/2 shadow-strongest m-4 p-2 text-xl border-gray-600 border-dotted border-4 flex-wrap flex-col">{renderMagic()} </div> : null}
                    
                </div>
                   
                     
                <div className="flex">
                    <button onClick={()=>navigate(-1)} className="flex bg-primary text-2xl m-2 rounded-md  shadow-pop-out p-2 text-orange-100 hover:bg-secondary hover:text-white -500 border-double border-4 border-slate-600 align-middle">Back</button>                    
                    <button onClick={()=> { 
                        selectClass()
                        dispatch(completeStep('class'))
                        navigate('/')
                    }} className="flex bg-primary text-2xl m-2 rounded-md  shadow-pop-out p-2 text-orange-100 hover:bg-gold hover:border-yellow-100 hover:text-yellow-100 border-double border-4 border-slate-600 align-middle">
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


