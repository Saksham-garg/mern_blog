import React from 'react'
import { Button } from 'flowbite-react'
import { AiFillGooglePlusCircle } from 'react-icons/ai'
import { signInWithPopup,getAuth, GoogleAuthProvider } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signInSuccess } from '../../stores/user/userSlice.js'
import { app } from '../firebase'
import axios from 'axios'

export const OAuth = () => {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleOAuth = async() => {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt:'select_account'})
        try {
            const resultFromGoogleAuth = await signInWithPopup(auth,provider)

            const getUserData = await axios.post('/api/v1/auth/google',{
                name:resultFromGoogleAuth.user.name,
                email:resultFromGoogleAuth.user.email,
                photoURL:resultFromGoogleAuth.user.photoURL
            })

            if(getUserData.data.success){
                dispatch(signInSuccess(getUserData.data.data))
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Button type='button' gradientDuoTone="pinkToOrange" outline onClick={handleOAuth}>
        <div className='flex items-center justify-center gap-1'> 
        <AiFillGooglePlusCircle/>
        <p>Continue with Google</p>
        </div>
    </Button>
  )
}

export default OAuth