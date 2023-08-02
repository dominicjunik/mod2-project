
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
     // some descriptions have imbedded markdown so ive tried to add logic so they do not display
     function displayBackground() {
        console.log('it does not include backslash n:')
        console.log(!(data.desc.includes('|')))
        return(
            <div className="flex flex-col items-center">
                
                <div className="flex flex-col items-center">
                    <h1 className="bg-secondary text-4xl m-4 rounded-md  shadow-pop-out p-3 text-orange-100">{data.name}</h1>
                    { data.desc.includes('|') ? null : <div className="bg-parchment m-4 shadow-strongest p-2 text-xl w-1/3 border-gray-600 border-dotted border-4 first-letter:text">{data.desc}</div>}                    
                </div>
                                 
                <div className="flex">
                    <button onClick={()=>navigate(-1)} className="flex bg-primary text-2xl m-2 rounded-md  shadow-pop-out p-2 text-orange-100 hover:bg-secondary hover:text-white -500 border-double border-4 border-slate-600 align-middle">Back</button>
                    <button onClick={()=> { 
                        selectBackground()
                        dispatch(completeStep('background'))
                        navigate('/')                        
                    }} className="flex bg-primary text-2xl m-2 rounded-md  shadow-pop-out p-2 text-orange-100 hover:bg-gold hover:border-yellow-100 hover:text-yellow-100 border-double border-4 border-slate-600 align-middle">
                            Confirm
                    </button>
                </div>
            </div>
        )
    }


    return (data ? displayBackground() : <div>loading...</div>)
}