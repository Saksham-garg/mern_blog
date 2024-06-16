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

const likeComment = asyncHandler(async(req,res,next) => {
    try {
        const comment = await Comment.findById(req.params.commentId)
        console.log(comment)
        if(!comment){
            return next(new ApiError(500,"Could not find this comment."))
        }
        console.log(req.user.id)
        const userLiked = comment.likes.indexOf(req.user.id)
        if(userLiked === -1){
            comment.likes.push(req.user.id)
            comment.numberOfLikes += 1
        }else{
            comment.likes.splice(userLiked,1)
            comment.numberOfLikes -= 1
        }
        comment.save()

        return res.status(200).json(new ApiResponse(200,comment,"Comment liked!"))
    } catch (error) {
        return next(new ApiError(500,error))
    }
})

const updateComment = asyncHandler(async(req,res,next) => {
    const { comment } = req.body
    try {
        const getComment = await Comment.findById(req.params.commentId)
        if(req.user.id !== getComment.userId && !req.user.isAdmin){
            return next(new ApiError(404,"You cannot update this comment."))
        }
        if(!getComment){
            return next(new ApiError(404,"Comment not found!"))
        }
 
        const updatedComment = await Comment.findByIdAndUpdate(req.params.commentId,{
                comment: comment
        },{new:true})

        if(!updateComment){
            return next(new ApiError(400,"Could not edit comment."))
        }
        return res.status(200).json(new ApiResponse(200,updatedComment,"Comment updated successfully."))
    } catch (error) {
        return next(new ApiError(500,error))
    }
})

const deleteComment = asyncHandler( async(req,res,next) => {
    try {
        console.log(req.params.commentId)
        const getComment = await Comment.findById(req.params.commentId)
        if(!getComment){
            return next(new ApiError(404,"Comment not found!"))
        }
        console.log(getComment)
        if(req.user.id !== getComment.userId && !req.user.isAdmin){
            return next(new ApiError(404,"You cannot delete this comment."))
        }
        const comment = await Comment.findByIdAndDelete(req.params.commentId)
        if(!comment){
            return next(new ApiError(500,"Cannot delete comment"))
        }
        return res.status(200).json(new ApiResponse(200,comment))
    } catch (error) {
        next(new ApiError(500,error))
    }
})

export {
    addComment,
    getComments,
    likeComment,
    updateComment,
    deleteComment
}