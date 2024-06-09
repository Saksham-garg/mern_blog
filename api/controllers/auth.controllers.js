import signUpSchema from "../types/auth/sign-up.js";
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from '../utils/ApiResponse.js'
import bcryptjs from 'bcryptjs'
import User from "../models/user.models.js";

const signUp = asyncHandler(async(req, res, next) => {
    const { username, email, password } = req.body;
    const userSchema = signUpSchema.safeParse({ username, email, password });
  
    if(!userSchema.success){
      throw new ApiError('Invalid inputs',400)
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
        throw new ApiError(error.message,500)
    }

})

export {
    signUp
}
