import { Router } from 'express'
import { createPost, getPosts, deletePost } from '../controllers/post.controllers.js'
import { verifyUser } from '../middlewares/user.middleware.js'
const postRoutes = Router()

postRoutes.route('/create').post(verifyUser,createPost)
postRoutes.route('/getAllPosts').get(getPosts)
postRoutes.route('/delete-post/:postId/:userId').delete(verifyUser,deletePost)

export default postRoutes