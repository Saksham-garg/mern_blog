import { Router } from 'express'
import { createPost } from '../controllers/post.controllers.js'
import { verifyUser } from '../middlewares/user.middleware.js'
const postRoutes = Router()

postRoutes.route('/create').post(verifyUser,createPost)

export default postRoutes