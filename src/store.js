import { configureStore } from "@reduxjs/toolkit";
import characterReducer from "./characterSlice";

export const store = configureStore({
    reducer: {
        char: characterReducer
    }
})