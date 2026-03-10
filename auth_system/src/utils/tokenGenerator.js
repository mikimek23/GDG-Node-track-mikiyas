import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET_KEY } from '../config/env.js'

export const generateToken = (userId)=>{
    const token = jwt.sign({userId: userId},ACCESS_TOKEN_SECRET_KEY, {expiresIn:'1h'})
    return token
}