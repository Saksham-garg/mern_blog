import { Comment } from '../models/comment.models.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const addComment = asyncHandler(async (req,res,next) => {
    console.log(req.body)
    const { comment } = req.body
    const { userId, postId } = req.params
    if(req.user.id !== userId){
        return next(new ApiError(401,"You are not allowed to add comment to this post."))
    }
    try {
        const resComment = await Comment.create({
            comment:comment,
            userId: userId,
            postId: postId
        })
        await resComment.save()
        if(!resComment){
             return next( new ApiError(500, "Cannot add comment to the post."))
        }
        return res.status(200).json(new ApiResponse(200,resComment,"Comment added Successfully"))
    } catch (error) {
        return next(new ApiError(500,error))
    }
})

const getComments = asyncHandler( async(req,res,next) => {
    try {
        const comments = await Comment.find({postId:req.params.postId}).sort({createdAt:-1})
        if(!comments){
            console.log(error)
            return next(new ApiError(500,"Could not get comments"))
        }
        return res.status(200).json(new ApiResponse(200,comments))
    } catch (error) {
        return next(new ApiError(500,error))
    }
})

export {
    addComment,
    getComments
}