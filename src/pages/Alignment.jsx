import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"


export default function Alignment(){
    const [alignList, setAlignList] =  useState([])  

    async function fetchAlignment(){
  
  
        // first API
        const url = 'https://www.dnd5eapi.co/api/alignments'
        //second API
        // const url = 'https://api.open5e.com/v1/classes/'
  
  
        try{
          const response = await axios.get(url)
          // console.log(response.data.results)
          setAlignList(response.data.results)
          
        }
        catch{
          console.log(error)
        }
        
    }
  
    useEffect(()=>{
      fetchAlignment()      
    },[])
  
    function loaded(){
      return (
        <div>
            <h1>Choose an Alignment:</h1>
            <div>
            </div>
              {alignList.map( (alignment) => ( 
                <Link key={alignment.index} to={`/alignment/${alignment.index}`} state={{data: alignment.url}}>
                  <div > 
                  {alignment.name} 
                  </div>
                </Link> 
              ) )}
              {/* {alignList.map( (character) => ( <li key={character.name}> {character.name} </li> ) )} */}
            
        </div>
      )
    }
  
  
    function loading() {
      return (
          <h1>Loading...</h1>
      )
    }
  
  
    return (
       alignList.length > 0 ? loaded() : loading()
    )
}