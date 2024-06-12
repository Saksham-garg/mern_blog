import { Post } from "../models/post.models.js";
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import createPostSchema from "../types/post/create-post.js";

const createPost = asyncHandler(async (req, res, next) => {
    const user = req.user
    console.log(req.user)
    if(!user.isAdmin){
        return next(new ApiError(404,'You are not authorized to create post.'))
    }

    const postSchema = createPostSchema.safeParse({title:req.body.title, content: req.body.content})
    if(!postSchema.success){
        return next(new ApiError(422,"Invalid Inputs"))
    }

    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g,'')
    const newPost = new Post({
        ...req.body,
        slug:slug,
        userId:req.user.id
    })
    try {
        await newPost.save()
        return res.status(201).json(new ApiResponse(201,newPost,"Post created successfully."))
    } catch (error) {
        return next(new ApiError(500,error.message))
    }
})

export {
    createPost
}