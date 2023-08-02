import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { useDispatch } from "react-redux"
import { storeAlignment, completeStep } from "../characterSlice"

export default function Align(){

    
    //this is used to save the data should the user press confirm on this page
    const dispatch = useDispatch()
        

    // this gets state from the previous page that was linked here
    const location = useLocation()
    const { data } = location.state

    // this is to save the data from the API 
    const [alignment, setAlignment] = useState()

    // this is to enable the back button
    const navigate = useNavigate()



    // custom fetch hook to handle this functio across multiple pages
    // fetching api data function
    async function fetchIndividaul(){

        const url = `https://www.dnd5eapi.co${data}`
  
        try{
          const response = await axios.get(url)
          console.log(response.data)
          setAlignment(response.data)
          
        }
        catch{
          console.log(error)
        }
        
    }
  

    // on page load retrieve data from api
    useEffect(()=>{
        fetchIndividaul()      
    },[])

    // saves the alignment data into the redux global state and also into the local storage
    function selectAlignment(){        
        dispatch(storeAlignment(alignment))
        localStorage.setItem('alignmentData', JSON.stringify(alignment))
        console.log(alignment)
    }

    // for conditional renderering
    function displayAlignment(){
        return (
            <div className="flex flex-col items-center">
                <h1 className="bg-secondary text-4xl m-4 rounded-md  shadow-pop-out p-3 text-orange-100">
                    {alignment.name} ({alignment.abbreviation}):
                </h1>
                <div>
                    {alignment.desc}
                    </div>
                <br />
               
                <div className="flex">
                    <button onClick={()=>navigate(-1)} className="flex bg-primary text-2xl m-2 rounded-md  shadow-pop-out p-2 text-orange-100 hover:bg-secondary hover:text-white -500 border-double border-4 border-slate-600 align-middle">Back</button>                    
                    <button onClick={()=> { 
                        selectAlignment()
                        dispatch(completeStep('alignment'))
                        navigate('/')
                    }} className="flex bg-primary text-2xl m-2 rounded-md  shadow-pop-out p-2 text-orange-100 hover:bg-gold hover:border-yellow-100 hover:text-yellow-100 border-double border-4 border-slate-600 align-middle">
                            Confirm
                    </button>
                </div>
            </div>
            )
    }


    return alignment ? displayAlignment() : <div>loading...</div>
}