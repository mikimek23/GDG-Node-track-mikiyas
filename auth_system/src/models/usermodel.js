import mongoose, {Schema} from 'mongoose'

const userSchema = new Schema({
    full_name:{type:String, minlength: 3, required: true},
    email: { type:String, required: true, unique: true},
    password: {type:String, required: true, minlength: 3}
})

export const User = mongoose.model('users', userSchema)