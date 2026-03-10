import mongoose from 'mongoose'
import { DATABASE_URI } from '../config/env.js'

export const initdatabase = async ()=>{
    try {
        await mongoose.connect(DATABASE_URI)
        console.log("connected to database")
    } catch (error) {
        console.log(`can't conecte the database ${error}`)
    }
}