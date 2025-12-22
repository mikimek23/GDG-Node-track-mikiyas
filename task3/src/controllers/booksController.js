import { bookSchema } from "../utils/validationSchema.js"
const books=[]

export const getBooks=(req,res)=>{
   if(books.length===0){
     return res.status(200).send("No book added yet")
   }
    return res.status(200).json(books)
}


export const searchBook=(req,res)=>{
    return res.status(200).send('You are on search page')
}

export const findBook=(req,res,next)=>{
    const id=Number(req.params.id)
    const book=books.find(book=>book.id===id)
    if(!book){
        const err=new Error('404 Not Found')
        err.statusCode=404
        return next(err)
    }

    return res.status(200).json(book)
}

export const postBook=(req,res,next)=>{
    const {error}=bookSchema.validate(req.body)
    if(error){
        const err={message:error.details[0].message}
        err.statusCode=400
       return next(err)
    }
    const isBookExist=books.find(book=>book.title===req.body.title)
   if(isBookExist){
    const err=new Error("Book is aleady exist")
    err.statusCode=400
    return next(err)
   }

    
    const id=books.length?books[books.length-1].id:0
    const newbook={
        id:id+1,
        ...req.body
    }
    books.push(newbook)
    return res.status(201).send("Book added successfully")
}
export const deleteBook=(req,res,next)=>{
       const id=Number(req.params.id)
    const book=books.find(book=>book.id===id)
    if(!book){
        const err=new Error('404 Not Found')
        err.statusCode=404
        return next(err)
    }
    const bookInd=books.indexOf(book)
    books.splice(bookInd,1)
    return res.status(200).send('Book removed')
    
}