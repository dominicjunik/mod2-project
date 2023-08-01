import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

export default function Races(){
    const [raceList, setRaceList] =  useState([])
    
    const navigate = useNavigate()

    async function fetchRaces(){


        // first API
        const url = 'https://www.dnd5eapi.co/api/races/'        
  
  
        try{
          const response = await axios.get(url)
          console.log(response.data.results)
          setRaceList(response.data.results)
          
        }
        catch{
          console.log(error)
        }
        
    }
  
    useEffect(()=>{
      fetchRaces()      
    },[])

    
    function loaded(){
      return (
        <div>
          <h1>Choose a Race</h1>
          <div className="classBox">
            {raceList.map( (race) => ( 
              <Link key={race.name} to={`/races/${race.index}`} state={{data: race.url}}>
                <div > 
                {race.name} 
                </div>
              </Link> 
            ) )}
          </div>
            
          <button onClick={()=>navigate(-1)}>Back</button>  
          
        </div>
      )
    }

    function loading() {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        raceList.length > 0 ? loaded() : loading()
     )
}




 

  





