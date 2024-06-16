import { Router } from "express";
import { addComment } from '../controllers/comment.controllers.js'
import { verifyUser } from '../middlewares/user.middleware.js'

const commentRoutes = Router()

commentRoutes.route('/create/:postId/:userId').post(verifyUser,addComment)

export default commentRoutes