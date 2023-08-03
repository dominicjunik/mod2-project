import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"

export default function Ability(){
    const [ability, setAbility] = useState() 

        // this gets state from the previous page that was linked here
    const location = useLocation()
    const { data } = location.state

    // this is to enable the back button
    const navigate = useNavigate()

    // custom fetch hook to handle this function across multiple pages
    // fetching api data function
    async function fetchIndividaul(){

        const url = `https://www.dnd5eapi.co${data}`

        try{
        const response = await axios.get(url)
        console.log(response.data)
        setAbility(response.data)
        
        }
        catch{
        console.log(error)
        }
        
    }
    
    // on page load retrieve data from api
    useEffect(()=>{
        fetchIndividaul()      
    },[])

    // for conditional renderering
    function displayAbility(){
        return (
            <div className="flex flex-col items-center">
                <h1 className="bg-secondary text-4xl m-4 rounded-md  shadow-pop-out p-3 text-orange-100">{ability.full_name}({ability.name}):</h1>
                <div className="bg-parchment m-4 shadow-strongest p-2 text-xl w-1/3 border-gray-600 border-dotted border-4 first-letter:text">
                    <p className="bg-primary text-white pl-1">Description:</p>
                    <p>{ability.desc[0]}</p>
                    <br />
                    <p className="bg-primary text-white pl-1">Game Mechanics:</p>
                    <p>{ability.desc[1]}</p>   
                </div>                           
                <button onClick={()=> navigate(-1)} className="flex bg-primary text-2xl m-2 rounded-md  shadow-pop-out p-2 text-orange-100 hover:bg-secondary hover:text-white -500 border-double border-4 border-slate-600 align-middle">Back</button>
            </div>
            )
    }
    

    return ability ? displayAbility() : <div>loading...</div>
}