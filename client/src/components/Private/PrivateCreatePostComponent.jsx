import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateCreatePostComponent = ({ children }) => {
    const { currentUser } = useSelector((state) => state.user)
  return (
    currentUser && currentUser.isAdmin ? children : <Navigate to='/sign-in' />
  )
}

export default PrivateCreatePostComponent