import axios from "axios";
import { useDispatch } from "react-redux";
import { signOutSuccess } from '../stores/user/userSlice.js'
const signOutUser = () => {
    const dispatch = useDispatch()
    const handleSignOut = async() => {
        try {
            const res = axios.post('/api/v1/auth/sign-out')
            if(!res){
                console.log(res)
            }else{
                dispatch(signOutSuccess())
            }
        } catch (error) {
         console.log(error.message)   
        }
    }
    return null;
}
export default signOutUser