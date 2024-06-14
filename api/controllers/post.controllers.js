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

const getPosts = asyncHandler(async (req,res,next) => {
    try {
        console.log(req)
        const startIndex = parseInt(req.query.start) || 0
        const limit = parseInt(req.query.limit) || 9
        const sortDirection = req.query.order == 'asc' ? 1 : -1

        const getAllPosts = await Post.find(                            //          Search Filter
           { ...(req.params.userId && { userId: req.params.userId} ),  //            User ID
            ...(req.params.category && {category: req.params.category} ), //        Category
            ...(req.params.searchItem && {                              
                $or:[
                   { title : { $regex : req.params.searchItem, $options:'i' }},//   Title, Content
                   { content : { $regex : req.params.searchItem, $options:'i' }},
                ]
            }),
            ...(req.params.slug && { slug: req.params.slug }),          //          Slug
            ...(req.params.postId && { _id: req.params.postId })       //           Post ID
        }).
        sort({updatedAt:sortDirection})
        .skip(startIndex)
        .limit(limit)

        const totalPosts = await Post.countDocuments()
        const now = new Date()
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth()-1,
            now.getDate()
        )

        const lastMonthPosts = await Post.countDocuments({
            createdAt:{ $gte: oneMonthAgo }
        })

        return res.status(200).json(new ApiResponse(200,{
            totalPosts:totalPosts,
            posts:getAllPosts,
            lastMonthPosts
        }))
    } catch (error) {
        next(new ApiError(500,error))
    }
})

const deletePost = asyncHandler( async(req, res, next) => {
    
    if(req.user.id !== req.params.userId){
        return next(new ApiError(404,"You cannot delete others post."))
    }
    
    if(!req.user.isAdmin){
        return next(new ApiError(404,"You are not allowed to delete post."))
    }
    

    try {
        const res = await Post.findByIdAndDelete(req.params.userId) 
        if(!res){
            return next(new ApiError(500,"Some error occured while deleting post"))
        }       
        return res.status(200).json(new ApiResponse(200,"Post Deleted successfully."))
    } catch (error) {
        return next(new ApiError(500,error))
    }
})

export {
    createPost,
    getPosts,
    deletePost
}