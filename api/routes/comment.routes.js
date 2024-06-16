import { Router } from "express";
import { addComment, getComments, likeComment, updateComment, deleteComment, getAllComments } from '../controllers/comment.controllers.js'
import { verifyUser } from '../middlewares/user.middleware.js'

const commentRoutes = Router()

commentRoutes.route('/create/:postId/:userId').post(verifyUser,addComment)
commentRoutes.route('/getComments/:postId').get(getComments)
commentRoutes.route('/likeComment/:commentId').put(verifyUser,likeComment)
commentRoutes.route('/update-comment/:commentId').put(verifyUser,updateComment)
commentRoutes.route('/delete-comment/:commentId').delete(verifyUser,deleteComment)
commentRoutes.route('/getAllComments').get(verifyUser,getAllComments)

export default commentRoutes