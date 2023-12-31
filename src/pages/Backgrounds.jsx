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
          <div className="flex flex-col items-center">
            <h1 className="bg-secondary text-4xl m-4 rounded-md  shadow-pop-out p-3 text-orange-100">Choose a Background</h1>
            <div className="w-1/2 flex flex-wrap items-center justify-evenly">
              {backgroundList.map( (background) => (                 
                <Link key={background.name} to={`/backgrounds/${background.slug}`} state={{data: background}}>
                  <div className="flex bg-secondary text-xl m-4 rounded-md h-12 px-2 shadow-pop-out items-center justify-center text-orange-100 hover:bg-primary hover:text-white -500 border-double border-4 border-slate-600 transform active:scale-90 transition-transform"> 
                  {background.name} 
                  </div>
                </Link> 
              ) )}
            </div>         
            <button onClick={()=>navigate(-1)} className="flex bg-primary text-2xl m-2 rounded-md  shadow-pop-out p-2 text-orange-100 hover:bg-secondary hover:text-white -500 border-double border-4 border-slate-600 align-middle transform active:scale-90 transition-transform">Back</button>  
            
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