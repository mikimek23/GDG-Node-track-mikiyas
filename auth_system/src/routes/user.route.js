import { Router } from "express";
import { verifyAccessToken } from "../middleware/auth.middleware.js";
import { getUser } from "../controllers/user.controller.js";

const userRouter = Router()

userRouter.get('/dashboard', verifyAccessToken,getUser)

export default userRouter