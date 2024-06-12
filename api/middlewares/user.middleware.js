import { ApiError } from "../utils/ApiError.js";
import jwt from 'jsonwebtoken'
import { asyncHandler } from "../utils/asyncHandler.js";

const verifyUser = asyncHandler(async(req,res,next) => {
    const token = req.cookies['access_token'];
    jwt.verify(token, process.env.JWT_SECRET,(err,user) => {
        if(err){
            return next(new ApiError(401,"Unauthorized"))
        }
        req.user = user
        next()
    })
})

export { verifyUser }