import { Router } from "express";
import { addComment, getComments, likeComment, updateComment } from '../controllers/comment.controllers.js'
import { verifyUser } from '../middlewares/user.middleware.js'

const commentRoutes = Router()

commentRoutes.route('/create/:postId/:userId').post(verifyUser,addComment)
commentRoutes.route('/getComments/:postId').get(getComments)
commentRoutes.route('/likeComment/:commentId').put(verifyUser,likeComment)
commentRoutes.route('/update-comment/:commentId').put(verifyUser,updateComment)

export default commentRoutes