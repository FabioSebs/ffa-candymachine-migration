import {createSlice} from '@reduxjs/toolkit'
export const timeSlice = createSlice({
    name: "time",
    initialState: {value: {
        mintTime: false,
    }},
    reducers: {
        mint: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { timeAction } = timeSlice.actions; 

export default timeSlice.reducer;