import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"

export default function Traits(){
  const [trait, setTrait] = useState()  
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
       setTrait(response.data)
       
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
 function displayTrait(){
    return (
        <div>
            <h1>{trait.name}</h1>
            <p>{trait.desc}</p>             
            {trait.trait_specific ? subTraits() : null} 
            <button onClick={()=> navigate(-1)} className="flex bg-primary text-2xl m-2 rounded-md  shadow-pop-out p-2 text-orange-100 hover:bg-secondary hover:text-white -500 border-double border-4 border-slate-600 align-middle">Back</button>
        </div>
        )
 }
 function subTraits(){
    return (
        <div>
            {trait.trait_specific.subtrait_options.from.options.map( (piece) => <div key={piece.item.index}>{piece.item.name}</div>)}
        </div>
    )
 }

    return trait ? displayTrait() : <div>loading...</div>
}