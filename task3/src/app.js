import express from 'express'
import router from './routes/bookRoutes.js'
import morgan from 'morgan'
import { errorHandler } from './middlewares/errorHandler.js'
const app=express()

app.use(morgan("dev"))
app.use(express.json())

app.use('/books',router)
app.use(errorHandler)
export default app