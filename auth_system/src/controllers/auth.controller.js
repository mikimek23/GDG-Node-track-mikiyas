import { User } from "../models/usermodel.js"
import { logInvalidator, userValidator } from "../utils/inputValidate.js"
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/tokenGenerator.js"
import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET_KEY } from "../config/env.js"
export const signUp = async(req, res,next)=>{
    const {error} = userValidator.validate(req.body)
    if(error){
        const err = new Error(error.details[0].message)
        err.statusCode = 400
        throw err
    }
    try {
        const {full_name, email, password} = req.body
        const user = await User.findOne({email:email})
        if(user){
            const error = new Error("User already exist")
            error.statusCode = 409
            throw error
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await  User.create({full_name, email, password:hashedPassword})
        const newUserObj = newUser.toObject()
        delete newUserObj.password

        return res.status(201).json({success:true, newUserObj})

    } catch (err) {
        next(err)
    }
}
export const logIn = async(req, res, next)=>{
    const {error} = logInvalidator.validate(req.body)
    if (error){
        const err = new Error(error.details[0].message)
        err.statusCode = 400
        throw err
    }
    try {
       const {email, password} = req.body
       const user = await User.findOne({email: email})
       if(!user){
        const error = new Error("Incorrect email or password")
        error.statusCode = 400
        throw error
       } 
       const isMatch =await bcrypt.compare(password, user.password)
       if(!isMatch){
        const error = new Error("Incorrect email or password")
        error.statusCode = 400
        throw error
       }
       const token = generateToken(user._id)
       res.cookie("token",token,{
        maxAge:60000 * 15,
        sameSite:'lax',
        httpOnly:true,
        secure:false,
       })
       return res.status(200).json({success:true,userId:user._id, token})
    } catch (err) {
        next(err)
    }
}
export const logOut = async(req, res, next)=>{
    try {
        const token = req.cookies?.token
        if(!token){
            const error = new Error("Token is not provided")
            error.statusCode = 401
            throw error
        }
        res.clearCookie("token",{httpOnly:true, secure:false})
        return res.status(200).json({success: true, message:"You have been logged out."})
    } catch (err) {
        next(err)
    }
}