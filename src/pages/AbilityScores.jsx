import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storeStats } from "../characterSlice"
import { useDispatch, useSelector } from "react-redux";

export default function AbilityScores(){    
    //for navigation buttons
    let navigate = useNavigate()
    
    //for updating the state to the global state
    const dispatch = useDispatch()
    

    // a local state variable to modify the form
    // fed the default from the global state of the same variable incase they change pages
    const { statsData } = useSelector(state => state.char)

    const [stats, setStats] = useState(statsData)
    
    

    // random number range that is inclusive for the min and the max value
    function randomNumberInclusive(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    //roll 4 times and discard the lowest
    function generateValue(){
        //start with a number above the range of the random
        let lowest = 7
        // set the roll total to 0
        let total = 0
        //roll 4 times
        for (let i = 1; i <= 4; i++){            
            let roll = randomNumberInclusive(1, 6)
            console.log(`roll: ${roll}`)
            roll < lowest ? lowest = roll : null
            console.log(`lowest: ${lowest}`)
            total += roll
        }
        let result = total - lowest
        console.log(result)
        return result
    }   
    
    function rollStats(){
        let newStats = {
            cha: generateValue(),
            con: generateValue(),
            dex: generateValue(),
            int: generateValue(),
            str: generateValue(),
            wis: generateValue()
        }
        setStats(newStats)
        
        
    }

    function handleChange(event){
        let key = event.target.id
        let num = Number(event.target.value)
        setStats({...stats, [key]: num})
        
        // localStorage.setItem('stats', stats)
    }

    function handleSubmit(event){
        // event.preventDefault()        
        console.log(stats)
        let sum = stats.cha + stats.con + stats.dex + stats.int + stats.str + stats.wis
        if(sum < 18 || sum > 108) {
            alert('Your stats are crazy, fix them')
            return
        }
        localStorage.setItem('stats', JSON.stringify(stats))
        dispatch(storeStats(stats))
        // localStorage.setItem('stats', stats)
        navigate('/') 

    }

    // useEffect(()=>{localStorage.setItem('stats', JSON.stringify(stats))}, [stats])
    

    return (
        <div>
            AbilityScores: 
            <br />
            enter scores manually or <button onClick={()=>rollStats()}>Roll!</button>  to randomly generate
                      
            <div>
            <form onSubmit={handleSubmit}>            
                <div>
                    <br />
                    <label htmlFor='cha'>Charisma:</label>
                    <input type="number"
                    id = 'cha'
                    value={stats.cha}
                    onChange={handleChange}
                    placeholder="enter a value or roll"
                    required 
                    />                    
                </div>
                <div>
                    <br />
                    <label htmlFor='con'>Constitution:</label>
                    <input type="number"
                    id = 'con'
                    value={stats.con}
                    onChange={handleChange}
                    placeholder="enter a value or roll"
                    required 
                    />                    
                </div>
                <div>
                    <br />
                    <label htmlFor='dex'>Dexterity:</label>
                    <input type="number"
                    id = 'dex'
                    value={stats.dex}
                    onChange={handleChange}
                    placeholder="enter a value or roll"
                    required 
                    />                    
                </div>
                <div>
                    <br />
                    <label htmlFor='int'>Intelligence:</label>
                    <input type="number"
                    id = 'int'
                    value={stats.int}
                    onChange={handleChange}
                    placeholder="enter a value or roll"
                    required 
                    />                    
                </div>
                <div>
                    <br />
                    <label htmlFor='str'>Strength:</label>
                    <input type="number"
                    id = 'str'
                    value={stats.str}
                    onChange={handleChange}
                    placeholder="enter a value or roll"
                    required 
                    />                    
                </div>
                <div>
                    <br />
                    <label htmlFor='wis'>Wisdom:</label>
                    <input type="number"
                    id = 'wis'
                    value={stats.wis}
                    onChange={handleChange}
                    placeholder="enter a value or roll"
                    required 
                    />                    
                </div> 

                
                <br />
                <button onClick={()=>navigate(-1)}>Back</button>                     
                <button type="submit">
                        Confirm
                </button>               
                
            </form>           

        </div>
        </div>            
                                       
       
    )
}