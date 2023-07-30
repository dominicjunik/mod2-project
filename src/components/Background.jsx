
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { storeBackgroundData, completeStep } from "../characterSlice"


export default function Background(){
    //this is used to save the data should the user press confirm on this page
    const dispatch = useDispatch()
    const navigate = useNavigate()    

    // this gets state from the previous page that was linked here
    // because API #2 sends all the data at once we just pass it down from the previous page
    const location = useLocation()
    const { data } = location.state
    console.log(data)

    // saves the character data into the redux global state and also into the local storage
    function selectBackground(){        
        dispatch(storeBackgroundData(data))
        localStorage.setItem('backgroundData', JSON.stringify(data))
    }

     // displays the data for the chosen character class
     function displayBackground() {
        return(
            <div>
                <div>
                    <h1>{data.name}</h1>
                    <div>{data.desc}</div>             
                </div>
                                 
                <div>
                    <button onClick={()=>navigate(-1)}>Back</button>
                    <button onClick={()=> { 
                        selectBackground()
                        dispatch(completeStep('background'))
                        navigate('/')                        
                    }}>
                            Confirm
                    </button>
                </div>
            </div>
        )
    }


    return (data ? displayBackground() : <div>loading...</div>)
}