import { Router } from "express";
import { addComment, getComments } from '../controllers/comment.controllers.js'
import { verifyUser } from '../middlewares/user.middleware.js'

const commentRoutes = Router()

commentRoutes.route('/create/:postId/:userId').post(verifyUser,addComment)
commentRoutes.route('/getComments/:postId').get(getComments)

export default commentRoutes