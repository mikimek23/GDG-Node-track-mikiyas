import express from 'express'
import router from './routes/userRoute.js'
import morgan from 'morgan'
import { errorHandler } from './middlewares/errorHandler.js'

const app=express()
app.use(express.json())
app.use(morgan('dev'))
app.use('/users',router)

app.use(errorHandler)

export default app