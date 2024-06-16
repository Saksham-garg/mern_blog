import axios from 'axios'
import moment from 'moment'
import React, { useState,useEffect } from 'react'

const Comment = ({comment}) => {
    const [ user,setUser ] = useState({}) 
    useEffect(() => {
        try {
            const fetchUser = async() => {
                const user = await axios.get(`/api/v1/user/${comment.userId}`)
                if(user){
                    setUser(user.data.data)
                }
            }
            fetchUser()
        } catch (error) {
            console.log(error)
        }
    }, [comment])
    
  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
        <div className='flex-shrink-0 mr-3'>
            <img src={user.profilePicture}  className='w-10 h-10 rounded-full bg-gray-200'></img>
        </div>
        <div className='flex-1'>
            <div className='flex items-center mb-1'>
            <span className='font-bold mr-1 text-xs truncate'>
                {user ? `@${user.username}` : 'anonymous user'}
            </span>
            <span className='text-gray-500 text-xs'>
                {moment(comment.createdAt).fromNow()}
            </span>
            </div>
            <p>{comment.comment}</p>
        </div>
    </div>
  )
}

export default Comment