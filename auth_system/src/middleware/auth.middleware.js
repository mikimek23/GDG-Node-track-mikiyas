import jwt from "jsonwebtoken"
import { ACCESS_TOKEN_SECRET_KEY } from "../config/env.js"
import { User } from "../models/usermodel.js"
export const verifyAccessToken = async (req, res, next)=>{
    try {
        const token = req.cookies?.token
        if(!token){
            const error = new Error("Token is not provided")
            error.statusCode = 401
            throw error
        }
        const decode = jwt.verify(token, ACCESS_TOKEN_SECRET_KEY)
        const user = await User.findOne({_id: decode.userId})
        if(!user){
            const error = new Error("Unauthorized")
            error.statusCode = 401
            throw error
        }
        req.user = user;
        next()
    } catch (err) {
        next(err)
    }
}