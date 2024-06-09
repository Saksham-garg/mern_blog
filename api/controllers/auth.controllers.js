import signUpSchema from "../types/auth/sign-up.js";
import signInSchema from "../types/auth/sign-in.js";
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from '../utils/ApiResponse.js'
import bcryptjs from 'bcryptjs'
import User from "../models/user.models.js";
import jwt from 'jsonwebtoken'

const signUp = asyncHandler(async(req, res, next) => {
    const { username, email, password } = req.body;
    const userSchema = signUpSchema.safeParse({ username, email, password });
  
    if(!userSchema.success){
      return next(new ApiError('Invalid inputs',400))
    }
    const hashedPassword = bcryptjs.hashSync(password,10)
    
    try {
        const user = await User.create({ username,email,password: hashedPassword })
        user.save()        
        const createdUser = await User.findOne(user._id).select(
            "-password"
        )   
    
        return res.status(201).json(
            new ApiResponse(201, createdUser,
                "User register successfully")
        )
    } catch (error) {
        next(new ApiError(error.message,500))
    }

})

const signIn = asyncHandler(async(req,res,next) => {
    
    const { email, password } = req.body
 
    const signInSchemaValid = signInSchema.safeParse({email,password})

    if(!signInSchemaValid.success){
        next(new ApiError(422,'Invalid Inputs'))
    }

    try {
        const user = await User.findOne({email})
        if(!user){
            return next(new ApiError(404,"User not found!"))
        }

        const comparePassword = bcryptjs.compareSync(password,user.password)

        if(!comparePassword){
            return next(new ApiError(400,"Invalid email or password"))
        }
        const {password:pass, ...rest } = user._doc
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

        return res.status(200).cookie('access_token',token,{ httpOnly:true}).json(rest)
        
    } catch (error) {
        next(new ApiError(400,error.message))
    }
})

export {
    signUp,
    signIn
}
