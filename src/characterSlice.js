import { createSlice } from "@reduxjs/toolkit";

///////////
// notes //
///////////
// im pretty sure my stored data functions are a crutch for updating my redux state ---- need to figure out how to get this to update how i want it too
const initialState = {    
    classData: storedCharacter(),
    raceData: storedRace(),
    // step = [false, false, false, false, false]
    // step = {race: false, class: false, abilityScore: false, alignment: false, background: false}
    step: storedStep(),
    statsData: storedStats(),
    alignmentData: storedAlignment(),
    backgroundData: storedBackground(),
    bioData: storedBio()   
}

function storedStats(){
    let storedStats = localStorage.getItem('stats')
    let storedStatsParsed = JSON.parse(storedStats)
    if (storedStatsParsed) {
        return storedStatsParsed
    } else {return {cha: 0, con: 0, dex: 0, int: 0, str: 0, wis: 0}}
}

// keeps track of the character creation process step
function storedStep(){
    // next time this should be an array of objects with a .name and .value so I can use the find() mmethod on them 
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

// local storage for alignment data
function storedAlignment(){
    let storedAlign = localStorage.getItem('alignmentData')
    let storedAlignParsed = JSON.parse(storedAlign)    
    if (storedAlignParsed) {
        return storedAlignParsed
    } else {return {}}
}

// local storage for background data
function storedBackground(){
    let storedBackground = localStorage.getItem('backgroundData')
    let storedBackgroundParsed = JSON.parse(storedBackground)    
    if (storedBackgroundParsed) {
        return storedBackgroundParsed
    } else {return {}}
}

// local storage for bio data
function storedBio(){
    let storedBio = localStorage.getItem('bio')
    let storedBioParsed = JSON.parse(storedBio)    
    if (storedBioParsed) {
        return storedBioParsed
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
            return state
        },
        storeRaceData: (state, action) => {
            state.raceData = action.payload
        },
        completeStep: (state, action) => {
            // example action.payload => "character"
            
            console.log(action.payload, 'ran the complete step function')
            state.step = {...state.step, [action.payload]: true}
            localStorage.setItem('step', JSON.stringify(state.step))
            console.log(state.step)
            // object using bracket notation to get the key from the action.payload   
        },
        storeStats: (state, action) => {
            
            console.log(action.payload, 'hi')
            state.statsData = action.payload
            return state
        },
        storeAlignment: (state, action) => {
            state.alignmentData = action.payload
        },
        storeBackgroundData: (state, action) => {
            state.backgroundData = action.payload  
        },
        storeBioData: (state, action) => {
            state.bioData = action.payload
        },
        reset: (state) => {
            localStorage.clear()
            state = initialState
            // this reloads the page
            window.location.reload(false)
            
        },
        
    }
})


export default characterSlice.reducer

export const { reset, completeStep, storeClassData, storeRaceData, storeStats, storeAlignment, storeBackgroundData, storeBioData} = characterSlice.actions