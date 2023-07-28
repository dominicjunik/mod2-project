import { createSlice } from "@reduxjs/toolkit";

const initialState = {    
    classData: storedCharacter(),
    raceData: storedRace(),
    // step = [false, false, false, false, false]
    // step = {race: false, class: false, abilityScore: false, alignment: false, background: false}
    step: storedStep(),
    stats: 'hi'   
}

// keeps track of the character creation process step
function storedStep(){
    let storedStep = localStorage.getItem('step')
    let storedStepParsed = JSON.parse(storedStep)
    if (storedStepParsed) {
        return storedStepParsed
    } else {return {race: false, class: false, abilityScore: false, alignment: false, background: false} }
}

// local storage for class data
function storedCharacter(){
    let storedChar = localStorage.getItem('classData')
    let storedCharParsed = JSON.parse(storedChar)    
    if (storedCharParsed) {
        return storedCharParsed
    } else {return {}}

}
// local storage for race data
function storedRace(){
    let storedRace = localStorage.getItem('raceData')
    let storedRaceParsed = JSON.parse(storedRace)
    // console.log(storedRaceParsed)
    // console.log(typeof storedRaceParsed)
    if (storedRaceParsed) {
        return storedRaceParsed
    } else {return {}}

}


const characterSlice = createSlice({
    name: 'characterSlice',
    initialState,
    reducers: {
        storeClassData: (state, action) => {
            console.log(action.payload)
            console.log(state.classData)
            state.classData = action.payload
        },
        storeRaceData: (state, action) => {
            state.raceData = action.payload
        },
        completeStep: (state, action) => {
            // example action.payload => "character"
            let step = action.payload
            console.log('ran the complete step function')
            let newState = {...state, [step]: true}
            // object using bracket notation to get the key from the action.payload
            state = newState
            
        },
        reset: (state) => {
            localStorage.clear()
            state = initialState
            // this reloads the page
            window.location.reload(false)
            
        }

    }
})


export default characterSlice.reducer

export const { reset, completeStep, storeClassData, storeRaceData} = characterSlice.actions