import { userSchema } from "../utils/userValidator.js"

const users=[
    {
        id:1,
        name:"mikimek",
        email:"mikimek@gmail.com"
    }
]

export const getUser=(req,res,next)=>{
    res.status(200).json({
         length:users.length,
         status:"success",
         data:users
    })
}
export const searchUser=(req,res,next)=>{
    const userId=parseInt(req.params.id)
    const isUser=users.find(user=>user.id===userId)
    if(!isUser){
        const err=new Error("User Not Found ")
        err.status="failed"
        err.statusCode=404
      return  next(err)
    }
    res.status(200).json({
         status:"success",
         data:isUser
    })
}
export const creatUser=(req,res,next)=>{
    const {error}=userSchema.validate(req.body)
    if(error){
        const err={message:error.details[0].message}
        err.statusCode=400
        return next(err)
    }
    const {name,email}=req.body
    const isUser=users.find(user=>user.email===email)
    if(isUser){
        const err=new Error("user already exist")
        err.status="failed"
        err.statusCode=400
        return next(err)
    }
    const id=users[users.length-1].id+1
    users.push({
        id:id,
        ...req.body
    })
    res.status(201).json({
        status:"success",
        message:"Account created successfully."
    })
}
export const updatUser=(req,res,next)=>{
     const {error}=userSchema.validate(req.body)
    if(error){
        const err={message:error.details[0].message}
        err.statusCode=400
        console.log(err)
        return next(err)
    }
    const id=parseInt(req.params.id)
    const{name,email}=req.body
    const userIndex=users.findIndex(user=>user.id===id)
    if(userIndex===-1){
        const err=new Error("User Not Found.")
        err.status="failed"
        err.statusCode=404
        console.log(err.message)
        return next(err)
    }
    const currentUser=users[userIndex]
    const updatedUser={
        ...currentUser,
        name:name !==undefined?name:currentUser.name,
        email:email !==undefined?email:currentUser.email,
        updatedAt:new Date().toISOString()
    }
    res.status(200).json({
        status:"success",
        message:"Account Updated."
    })
}
export const deleteUser=(req,res,next)=>{
     const id=parseInt(req.params.id)
    const userIndex=users.findIndex(user=>user.id===id)
    if(userIndex===-1){
        const err=new Error("User Not Found.")
        err.status="failed"
        err.statusCode=404
        console.log(err.message)
        return next(err)
    }
    users.splice(userIndex,1)
     res.status(200).json({
        status:"success",
        message:"Account deleted."
    })
}