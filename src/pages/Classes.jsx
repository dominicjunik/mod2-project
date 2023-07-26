import { useEffect, useState } from "react"
import axios from "axios"


export default function Classes(){

  const [classList, setClassList] =  useState([])  

  async function fetchClasses(){

      const url = 'https://www.dnd5eapi.co/api/classes/'

      try{
        const response = await axios.get(url)
        // console.log(response.data.results)
        setClassList(response.data.results)
        
      }
      catch{
        console.log(error)
      }
      
  }

  useEffect(()=>{
    fetchClasses()      
  },[])


  return (
      <div>
          <h1>choose a class</h1>
          <ul>
            {/* {classList.map( (class) => ( <li key={class.name}> {class.name} </li> ) )} */}
          </ul>
      </div>
  )
}