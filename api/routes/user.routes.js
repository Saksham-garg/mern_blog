import { Router } from 'express'
import { verifyUser } from '../middlewares/user.middleware.js'
import { updateUserProfile, deleteUserProfile } from '../controllers/user.controllers.js'

const userRoutes = Router()

userRoutes.put('/update/:userId',verifyUser,updateUserProfile)
userRoutes.delete('/delete/:userId',verifyUser,deleteUserProfile)

export default userRoutes;