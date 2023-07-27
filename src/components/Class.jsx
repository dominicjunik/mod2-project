import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { useDispatch } from "react-redux"
import { storeClassData } from "../characterSlice"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"

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


    // displays the data for the chosen character class
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
                    <button onClick={()=> { 
                        selectClass()
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


