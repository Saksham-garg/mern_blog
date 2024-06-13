import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    error:true,
    loading:false,
    posts:{}
}

const postsSlice = createSlice({
    name:'post',
    initialState,
    reducers:{
        postCreateStart : (state) => {
            state.loading = true
            state.error = null
        },
        postCreateSuccess: (state) => {
            state.loading = false
            state.error = false
        },
        postCreateFailure: (state,action) => {
            state.loading = false
            state.error = ad
        },
        setPosts: (state,action) => {
            state.posts = action.payload
        }
    }
})

export const { postCreateFailure, postCreateSuccess, postCreateStart, setPosts } = postsSlice.actions
export default postsSlice.reducer