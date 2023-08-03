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
            race.ability_bonuses.map((ability)=>(<div key={ability.ability_score.name}><Link key={ability.ability_score.index} to={`/ability-scores/${ability.ability_score.index}`} state={{data: ability.ability_score.url}} className=" text-blue-700 hover:text-blueNCS font-medium">{ability.ability_score.name}</Link> +{ability.bonus}</div>))
        )
    }

    function renderStartingProf(){
        return (
            race.starting_proficiencies.map((prof)=><p key={prof.index}>{prof.name}</p>)
        )
    }
    
    function renderTraits(){
        return ( race.traits.map( (trait)=> <Link key={trait.index} to={`/traits/${trait.index}`} state={{data: trait.url}}><p key={trait.index} className="pr-4 text-blue-700 hover:text-blueNCS">{trait.name}</p> </Link>))
    }
 // 
    
    // displays the data for the chosen character class
    function displayRace() {
        return(
            <div className="flex flex-col items-center">
                <h1 className="bg-secondary text-4xl m-4 rounded-md  shadow-pop-out p-3 text-orange-100">{race.name}</h1>
                <div className="flex w-1/2 bg-parchment shadow-strongest m-4 p-2 text-xl border-gray-600 border-dotted border-4 flex-wrap flex-col">
                
                    <div><p className="bg-primary text-white pl-1">Size:</p> {race.size_description}</div>
                    <div><p className="bg-primary text-white pl-1">Speed:</p> {race.speed}</div>
                    <div><p className="bg-primary text-white pl-1">Ability Bonus:</p></div>
                    {renderAbilityScores()}
                    <div><p className="bg-primary text-white pl-1">Alignment:</p> {race.alignment} </div>
                    <div><p className="bg-primary text-white pl-1">Languages:</p> {race.language_desc} </div>
                    <div><p className="bg-primary text-white pl-1">Starting Proficiencies:</p> {race.starting_proficiencies.length > 0 ? renderStartingProf() : 'none'}</div>
                    <div><p className="bg-primary text-white pl-1">Starting Traits:</p> {race.traits.length > 0 ? renderTraits() : 'none'}</div>
                </div>
                              
                
                
                <div className="flex">
                    <button onClick={()=>navigate(-1)} className="flex bg-primary text-2xl m-2 rounded-md  shadow-pop-out p-2 text-orange-100 hover:bg-secondary hover:text-white -500 border-double border-4 border-slate-600 align-middle transform active:scale-90 transition-transform">Back</button>
                    <button onClick={()=> { 
                        selectRace()
                        dispatch(completeStep('race'))
                        navigate('/')                        
                    }} className="flex bg-primary text-2xl m-2 rounded-md  shadow-pop-out p-2 text-orange-100 hover:bg-gold hover:border-yellow-100 hover:text-yellow-100 border-double border-4 border-slate-600 align-middle transform active:scale-90 transition-transform">
                            Confirm
                    </button>
                </div>
            </div>
        )
    }
 


    return  race ? displayRace() : <div>loading...</div>
}






   


    
  


    


