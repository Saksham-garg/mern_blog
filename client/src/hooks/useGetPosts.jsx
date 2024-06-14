import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setPosts } from '../stores/posts/postsSlice.js'
import axios from 'axios'

const useGetPosts = () => {
    let data ={}
    const fetchPosts = async(setShowMore,params) => {
        try {
            data = await axios.get(`/api/v1/post/getAllPosts`,{
                params
            })
            if(data.data.data.posts.length >= 9){
                setShowMore(true)
            }else{
                setShowMore(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return [fetchPosts,data?.data?.data]
}

export default useGetPosts