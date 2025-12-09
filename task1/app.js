import http from 'http'

const server= http.createServer((req,res)=>{
    if(req.method==="GET"){
        if(req.url==='/'){
            res.write("Welcome to the Home Page")
            res.end()
        }else if(req.url==='/info'){
            res.write("This is the information page")
            res.end()
        }else{
        res.end("404, Page Not Found!!")
    }
    }else if(req.method="POST"){
        if(req.url==='/submit'){
        let data=" "
        req.on('data',chunk=>{
            data +=chunk.toString()
        })
        req.on('end',()=>{
            res.writeHead(201)
            res.end(data)
        })
    }else{
        res.end("404, Page Not Found")
    }
        
    }else{
        res.end("404, Page Not Found")
    }
})

server.listen(3000,()=>{
    console.log(`Server is running on port 3000`)
})