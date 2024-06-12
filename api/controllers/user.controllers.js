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
    if(req.params.userId !== req.user.id){
        return next(new ApiError(401, "You are not allowed to update others profile."))
    }
    try {
        await User.findByIdAndDelete(req.params.userId)
        return res.status(200).json(new ApiResponse(200,"User deleted successfully."))
    } catch (error) {
        return res.status(500, error.message)
    }
})

export { 
    updateUserProfile,
    deleteUserProfile
}   