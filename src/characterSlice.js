import { createSlice } from "@reduxjs/toolkit";

const initialState = {    
    classData: {},

}

const characterSlice = createSlice({
    name: 'characterSlice',
    initialState,
    reducers: {
        storeClassData: (state, action) => {
            console.log(action.payload)
            console.log(state.classData)
            state.classData = action.payload
        }

    }
})

export default characterSlice.reducer

export const { storeClassData } = characterSlice.actions