import {config} from 'dotenv'
config({path:'.env' })

export const {PORT, NODE_ENV, DATABASE_URI, ACCESS_TOKEN_SECRET_KEY}=process.env