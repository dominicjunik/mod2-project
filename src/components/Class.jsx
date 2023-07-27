import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"

export default function Class(){
    
    const location = useLocation()
    const { data } = location.state
    const [character, setCharacter] = useState()
    const navigate = useNavigate()

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
  
    useEffect(()=>{
        fetchIndividaul()      
    },[])

    function displayCharacter() {
        return(
            <div>
                <h1>{character.name}</h1>
                <h2>Hit dice: {character.hit_die}</h2>
                <div>
                    <h2>Proficiencies:</h2>
                    <ul>
                        {character.proficiencies.map((thing)=> <li key={thing.index}>{thing.name}</li>)}
                    </ul>                    
                </div>
                <div>
                    <button onClick={()=>navigate("/classes")}>Back</button>
                    <button>Confirm</button>
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