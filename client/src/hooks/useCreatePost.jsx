import axios from 'axios'
import { postCreateFailure, postCreateStart, postCreateSuccess } from '../stores/posts/postsSlice.js'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const useCreatePost = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const fetchData = async(e, data, setFormData) => {
        e.preventDefault();
        try {
            dispatch(postCreateStart())
            const res = await axios.post('/api/v1/post/create',data)
            if(!res){
               dispatch(postCreateFailure(res.message))
            }
            dispatch(postCreateSuccess())
            setFormData({})
            navigate(`/post/${res.data.data.slug}`)
        } catch (error) {
            dispatch(postCreateFailure(error))
            console.log(error)
        }
    }
    return fetchData
}

export default useCreatePost