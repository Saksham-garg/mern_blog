import React, { useState } from 'react'
import { Alert, Button, Label, TextInput, Spinner } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { signInFailure, signInStart, signInSuccess } from '../stores/user/userSlice'

const SignUp = () => {
  const [formData,setFormData] = useState({})
  const dispatch = useDispatch()
  const { loading, error:errorMessage } = useSelector((state) => state.user)

  const navigate = useNavigate()
  const handleInput = (e) => {
    setFormData({...formData,[e.target.id]:e.target.value.trim()})
  }

  const signUpUser = async() => {
    if(!formData?.username || !formData?.password || formData?.email){
      return dispatch(signInFailure('Please fill all the fields'))
    }
    try {
      dispatch(signInStart())
      const res = await axios.post('/api/v1/auth/sign-up',formData)
      if(res.data.success == false){
        return dispatch(signInFailure(res.data.message))
      }
      if(res.data.success){
        dispatch(signInSuccess(res?.data?.data))
        return navigate('/sign-in')
      }
    } catch (error) {
      dispatch(signInFailure(error.response.data.message))
    }
  }
  return (
    <div className='p-3 mt-20 min-h-screen'>
      <div className="flex flex-col max-w-3xl md:flex-row m-auto md:items-center">

        {/* Left Side  */}
        <div className="flex-1">
        <Link
          to="/"
          className="text-2xl font-bold dark:text-white"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            Saksham's
          </span>
          blog
        </Link>
        <p className='text-sm mt-5'>Find the blogs in you interest, You can signup with email and password or with Google. </p>
        </div>

        {/* Right Side  */}
        <div className="flex-1 mt-5 w-full">
              <form className='flex flex-col gap-5'>
                <div className="flex flex-col gap-3">
                  <Label value="Your Username"/>
                  <TextInput type="text" placeholder="Username" id="username" onInput={handleInput}></TextInput>
                </div>
                <div className="flex flex-col gap-3">
                  <Label value="Your Email"/>
                  <TextInput type="email" placeholder="Email" id="email" onInput={handleInput}></TextInput>
                </div>
                <div className="flex flex-col gap-3">
                  <Label value="Your Password"/>
                  <TextInput type="password" placeholder="Password" id="password" onInput={handleInput}></TextInput>
                </div>
              </form>
              
              <Button gradientDuoTone="purpleToPink" className='w-full mt-5' type='submit' disabled={loading} onClick={signUpUser}>
                {
                  loading ? (
                    <>
                    <Spinner />
                    <span className='pl-3'>Loading...</span>
                    </>
                  ): 'Sign Up'
                }
                </Button>
              
              <div className="mt-4 text-sm">
                <span>Have Account?</span> <Link to="/sign-in" className='text-blue-500'>Sign In</Link>
              </div>
              {
                errorMessage && (
                  <Alert color="failure">
                    {errorMessage}
                  </Alert>
                )
              }
        </div>
      </div>
    </div>
  )
}

export default SignUp