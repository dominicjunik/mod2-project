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
            <div>
                <h1>{ability.full_name}({ability.name}):</h1>
                <div>{ability.desc[0]}</div>
                <br />
                <h2>Game Mechanics:</h2>
                <div>{ability.desc[1]}</div>               
                <button onClick={()=> navigate(-1)}>back</button>
            </div>
            )
    }
    

    return ability ? displayAbility() : <div>loading...</div>
}