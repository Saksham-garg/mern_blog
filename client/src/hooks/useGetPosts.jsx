import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setPosts } from '../stores/posts/postsSlice.js'
import axios from 'axios'

const useGetPosts = () => {
    const dispatch = useDispatch()
    const { currentUser } = useSelector((state) => state.user)
    const { posts } = useSelector((state) => state.post)
    useEffect(() => {
        ;((async() => {
            try {
                const res = await axios.get(`/api/v1/post/getAllPosts`,{
                    params:{    
                        userId:currentUser._id
                    }
                })
                console.log(res.data.data)
                dispatch(setPosts(res.data.data))
            } catch (error) {
                console.log(error)
            }
        }))();
    },[])
    return [posts,currentUser]
}

export default useGetPosts