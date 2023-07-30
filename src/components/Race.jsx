import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { useDispatch } from "react-redux"
import { storeRaceData, completeStep } from "../characterSlice"


export default function Race(){
     //this is used to save the data should the user press confirm on this page
     const dispatch = useDispatch()    

     // this gets state from the previous page that was linked here
     const location = useLocation()
     const { data } = location.state
 
     // this is to save the data from the API 
     const [race, setRace] = useState()
 
     // this is to enable the back button
     const navigate = useNavigate()

    // custom fetch hook to handle this function across multiple pages
    // fetching api data function
    async function fetchIndividaul(){

        const url = `https://www.dnd5eapi.co${data}`
  
        try{
          const response = await axios.get(url)
          console.log(response.data)
          setRace(response.data)
          
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
    function selectRace(){        
        dispatch(storeRaceData(race))
        localStorage.setItem('raceData', JSON.stringify(race))
    }

    //function to display the ability scores  and link the attribute to the ability score page -> the map is a mess but im not sure how to make it prettier
    function renderAbilityScores(){
        return (
            race.ability_bonuses.map((ability)=>(<div key={ability.ability_score.name}><Link key={ability.ability_score.index} to={`/ability-scores/${ability.ability_score.index}`} state={{data: ability.ability_score.url}}>{ability.ability_score.name}</Link> +{ability.bonus}</div>))
        )
    }

    function renderStartingProf(){
        return (
            race.starting_proficiencies.map((prof)=><div key={prof.index}>{prof.name}</div>)
        )
    }
    
    function renderTraits(){
        return ( race.traits.map( (trait)=> <Link key={trait.index} to={`/traits/${trait.index}`} state={{data: trait.url}}><div key={trait.index}>{trait.name}</div> </Link>))
    }
 // 
    
    // displays the data for the chosen character class
    function displayRace() {
        return(
            <div>
                <div>
                    <h1>{race.name}</h1>
                    <div>Size: <br/> {race.size_description}</div>
                    <div>Speed: <br/> {race.speed}</div>
                    <div>Ability bonus: </div>
                    {renderAbilityScores()}
                    <div>Alignment: <br/> {race.alignment} </div>
                    <div>Languages: <br/> {race.language_desc} </div>
                    <div>Starting Proficiencies: <br/> {race.starting_proficiencies.length > 0 ? renderStartingProf() : 'none'}</div>
                    <div>Starting Traits: <br/> {race.traits.length > 0 ? renderTraits() : 'none'}</div>
                </div>
                              
                
                
                <div>
                    <button onClick={()=>navigate(-1)}>Back</button>
                    <button onClick={()=> { 
                        selectRace()
                        dispatch(completeStep('race'))
                        navigate('/')                        
                    }}>
                            Confirm
                    </button>
                </div>
            </div>
        )
    }
 


    return  race ? displayRace() : <div>loading...</div>
}






   


    
  


    


