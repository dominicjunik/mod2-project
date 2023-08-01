import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

export default function Backgrounds(){

    const [backgroundList, setBackgroundList] =  useState([])
    const navigate = useNavigate()  

    async function fetchBackgrounds(){


        // second API
        const url = 'https://api.open5e.com/v1/backgrounds/'        
  
  
        try{
          const response = await axios.get(url)
          console.log(response.data.results)
          setBackgroundList(response.data.results)
          
        }
        catch{
          console.log(error)
        }
        
    }
  
    useEffect(()=>{
      fetchBackgrounds()      
    },[])
    
    function loaded(){
        return (
          <div>
            <h1>Choose a Background:</h1>
            <div>
              {backgroundList.map( (background) => (                 
                <Link key={background.name} to={`/backgrounds/${background.slug}`} state={{data: background}}>
                  <div > 
                  {background.name} 
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
        backgroundList.length > 0 ? loaded() : loading()
    )
}