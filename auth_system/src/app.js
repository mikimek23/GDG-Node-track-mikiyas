import express from 'express'
import { PORT } from './config/env.js'
import { initdatabase } from './database/initdatabase.js'
import { errorHandler } from './middleware/errorHandler.js'
import authRouter from './routes/auth.route.js'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.route.js'

const app = express()
await initdatabase()
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.use(errorHandler)
app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})