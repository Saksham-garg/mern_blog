import { Router } from 'express'
import { verifyUser } from '../middlewares/user.middleware.js'
import { updateUserProfile, deleteUserProfile, getAllUsers, getUser } from '../controllers/user.controllers.js'

const userRoutes = Router()

userRoutes.put('/update/:userId',verifyUser,updateUserProfile)
userRoutes.delete('/delete/:userId',verifyUser,deleteUserProfile)
userRoutes.get('/getUsers',verifyUser,getAllUsers)
userRoutes.get('/:userId',getUser)

export default userRoutes;