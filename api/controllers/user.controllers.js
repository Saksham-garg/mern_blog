import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import signUpSchema from '../types/auth/sign-up.js'
import User from '../models/user.models.js'
import bcryptjs from 'bcryptjs'

const updateUserProfile = asyncHandler(async (req,res,next) => {
    const { user } = req
    if(user.id !== req.params.userId){
        return next(new ApiError(401, "You are not allowed to update others profile."))
    }
    const { username, email, password } = req.body
    const userSchema = signUpSchema.safeParse({username,email,password})

    const hashedPassword = bcryptjs.hashSync(password,10)
    if(!userSchema.success){
        console.log(userSchema)
        return next(new ApiError(422,userSchema.error.errors.map((err) => err.message)))
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId,{
            $set:{
                username:username,
                email:email,
                password:hashedPassword
            }
        },{new:true})
        const {password:pass, ...rest } = updatedUser._doc
        console.log(rest)
        return res.status(200).json(new ApiResponse(200,rest,"User updated successfully."))
    } catch (error) {
        return next(new ApiError(500,error.message))
    }
})

const deleteUserProfile = asyncHandler( async(req,res,next) => {
    if(!req.user.isAdmin){
        next(new ApiError(404,"You are not allowed to delete others users"))
    }
    console.log(req)    
    if(req.params.userId !== req.user.id){
        return next(new ApiError(401, "You are not allowed to delete others users."))
    }
    try {
        await User.findByIdAndDelete(req.params.userId)
        return res.status(200).json(new ApiResponse(200,"User deleted successfully."))
    } catch (error) {
        return res.status(500, error.message)
    }
})

const getAllUsers = asyncHandler( async (req,res, next) => {
    if(!req.user.isAdmin){
        next(new ApiError(404,"You are not allowed to see all users"))
    }

    try {
        const startIndex = req.query.startIndex || 0
        const limit = req.query.limit || 9
        const sortDirection = req.query.sort == 'asc' ? 1 : -1

        const allUsers = await User.find()
        .sort({ createdAt: sortDirection })
        .skip(startIndex)
        .limit(limit)

        const usersWithoutPassword = allUsers.map((user) => {
            const { password:pass, ...rest } = user._doc
            return rest
        })

        const totalUsers = await User.countDocuments()

        const now = new Date()
        const OneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth()-1,
            now.getDate()
        )

        const lastMonthUsers = await User.countDocuments({
            createdAt:{ $gte: OneMonthAgo }
        })

        if(!allUsers){
            return next(new ApiError(500,"Something went wrong while getting users"))
        }
        return res.status(200).json(new ApiResponse(200,{totalUsers,users: usersWithoutPassword, lastMonthUsers}))
    } catch (error) {
        next(new ApiError(500, error))
    }   
})

const getUser = asyncHandler(async(req,res,next) => {
    try {
        const user = await User.findById(req.params.userId)
        const { password:pass, ...rest} = user._doc
        return res.status(200).json(new ApiResponse(200,rest))
    } catch (error) {
        return  next(new ApiError(500,error))
    }
})

export { 
    updateUserProfile,
    deleteUserProfile,
    getAllUsers,
    getUser
}   