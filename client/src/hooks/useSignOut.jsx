import axios from "axios";
import { useDispatch } from "react-redux";
import { signOutSuccess } from '../stores/user/userSlice.js'
const signOutUser = () => {
    const dispatch = useDispatch();
    const fetchData = async () => {
        try {
            const res = await axios.post('/api/v1/auth/sign-out')
            if(!res){
                console.log(res)
            }else{
                dispatch(signOutSuccess())
            }
        } catch (error) {
            console.log(error.message)   
        }
    };

    return fetchData
}
export default signOutUser