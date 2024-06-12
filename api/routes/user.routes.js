import { Router } from 'express'
import { verifyUser } from '../middlewares/user.middleware.js'
import { updateUserProfile } from '../controllers/user.controllers.js'

const userRoutes = Router()

userRoutes.put('/:userId',verifyUser,updateUserProfile)

export default userRoutes;