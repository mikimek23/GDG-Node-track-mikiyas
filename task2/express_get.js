import express from 'express'

const app=express()


app.use(express.json())
app.get('/',(req,res)=>{
res.type('text/html').send('<h1 style="color:green">Welcome to Home Page</h1>')
})
app.get('/about',(req,res)=>{
    res.type('text/plain').send('about page')
})
app.get('/student/:studentId',(req,res)=>{
    res.send({studentId:req.params.studentId,department:req.query.department})
})


app.listen(3000,()=>{
    console.log('server is running on port http://localhost:3000')
})