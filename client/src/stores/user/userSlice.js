import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    loading:false,
    error:null
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart : (state) => {
            state.loading = true
            state.error = null
        },
        signInSuccess : (state,action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = null
        },
        signInFailure: (state,action) => {
            state.error = action.payload
            state.loading = false
        },
        deleteStart: (state) => {
            state.loading = true
            state.error = null
        },
        deleteSuccess: (state) => {
            state.loading = false
            state.error = null
            state.currentUser = null
        },
        deleteFailure: (state,action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const { signInFailure, signInStart, signInSuccess, deleteStart, deleteFailure, deleteSuccess } = userSlice.actions
export default userSlice.reducer
