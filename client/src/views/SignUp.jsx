import React from 'react'
import { Button, Label, TextInput } from 'flowbite-react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='p-3 mt-20'>
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
                  <TextInput type="text" placeholder="Username" id="username"></TextInput>
                </div>
                <div className="flex flex-col gap-3">
                  <Label value="Your Email"/>
                  <TextInput type="text" placeholder="Email" id="email"></TextInput>
                </div>
                <div className="flex flex-col gap-3">
                  <Label value="Your Password"/>
                  <TextInput type="text" placeholder="Password" id="password"></TextInput>
                </div>
              </form>
              
              <Button gradientDuoTone="purpleToPink" className='w-full mt-5'>Sign Up</Button>
              
              <div className="mt-4 text-sm">
                <span>Have Account?</span> <Link to="/sign-in" className='text-blue-500'>Sign In</Link>
              </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp