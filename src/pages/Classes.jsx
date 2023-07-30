import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"


export default function Classes(){

  const [classList, setClassList] =  useState([])
  
  const navigate = useNavigate()

  async function fetchClasses(){


      // first API
      const url = 'https://www.dnd5eapi.co/api/classes/'
      //second API
      // const url = 'https://api.open5e.com/v1/classes/'


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

  function loaded(){
    return (
      <div>
          <h1>choose a class</h1>
          <div>
            {classList.map( (character) => ( 
                <Link key={character.name} to={`/classes/${character.name}`} state={{data: character.url}}>
                  <div > 
                  {character.name} 
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
     classList.length > 0 ? loaded() : loading()
  )
}


// //this is for the second api
// function loaded2(){
//   return (
//     <div>
//         <h1>choose a class</h1>
//         <div className="classBox">
//         </div>
//           {classList.map( (character) => ( 
//             <Link key={character.name} to={`/classes/${character.name}`} state={{data: character.url}}>
//               <div > 
//                 <h2>{character.name}</h2>
//                 <p>{character.subtypes_name}</p>
//                 <ul>
//                   {character.archetypes.map((type)=>(<li key={type.name}>{type.name}</li>))}
//                 </ul>
//               </div>
//             </Link> 
//           ) )}
//           {/* {classList.map( (character) => ( <li key={character.name}> {character.name} </li> ) )} */}
        
//     </div>
// )
// }