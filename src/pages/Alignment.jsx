import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"


export default function Alignment(){
    const [alignList, setAlignList] =  useState([])  

    const navigate = useNavigate()

    async function fetchAlignment(){
  
  
        // first API
        const url = 'https://www.dnd5eapi.co/api/alignments'       
  
  
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
        <div className="flex flex-col items-center">
            <h1 className="bg-secondary text-4xl m-4 rounded-md  shadow-pop-out p-3 text-orange-100">Choose an Alignment</h1>
            <div>
              {alignList.map( (alignment) => ( 
                <Link key={alignment.index} to={`/alignment/${alignment.index}`} state={{data: alignment.url}}>
                  <div > 
                  {alignment.name} 
                  </div>
                </Link> 
              ) )}
            </div>
            <button onClick={()=>navigate(-1)} className="flex bg-primary text-2xl m-2 rounded-md  shadow-pop-out p-2 text-orange-100 hover:bg-secondary hover:text-white -500 border-double border-4 border-slate-600 align-middle">Back</button>
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