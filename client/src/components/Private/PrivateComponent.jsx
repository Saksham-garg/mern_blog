import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
const PrivateComponent = ({children}) => {
    const { currentUser } = useSelector((state) => state.user)
    return (
        <div className="">
           { currentUser ? children : <Navigate to='/sign-in' replace/>}
        </div>
    )
}

export default PrivateComponent