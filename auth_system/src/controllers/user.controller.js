import { User } from "../models/usermodel.js"
export const getUser = async (req, res, next)=>{
    try {
         const id = req.user?._id
        if(!id){
        const error = new Error("Unauthorized")
        error.statusCode = 401
        throw error
        }
        const user = await User.findOne(id).select("-password")
        if (!user){
            const error = new Error("User not found")
            error.statusCode = 404
            throw error
        }
        return res.status(200).json({success: true, user})

    } catch (err) {
        next(err)
    }
   
}