import http from 'http'
let students=[
    {
        id:1,
        name:"Abebe",
    },
    {
        id:2,
        name:"Ayele"
    }
]
const server= http.createServer((req,res)=>{
    if(req.method=='GET'){
        if(req.url==='/students'){
        res.end(JSON.stringify(students))
    }
    }else if(req.method==='POST'){
        if(req.url==='/students'){
            let body=''
            let id=students[students.length-1].id
            req.on('data',chunk=>{
            body +=chunk.toString()
        })
            req.on('end',()=>{
                const data=JSON.parse(body)
                const newStudent={id:++id,name:data.name}
                students.push(newStudent)
                res.writeHead(201)
                res.end(`Student created: ${JSON.stringify(newStudent)}`)
            })
        }

    }else if(req.method==="PUT"){
        let urlSplit= req.url.split('/')
        if(urlSplit[1]==='students'){
        let id=Number(urlSplit[2])
            const sId=students.findIndex(item=>item.id===id)
            if(sId === -1){
               return res.end('Student not found')
            }
            let body=''
            req.on('data',chunk=>{
                body +=chunk
            })
            req.on('end',()=>{
                const data=JSON.parse(body).name
                students[sId].name=data
                res.write(JSON.stringify(students[sId]))
                res.end()
            })
        }else{
            res.end("Page Not Found")
        }
        }else if(req.method==="DELETE"){
            let urlSplit= req.url.split('/')
            if(urlSplit[1]==='students'){
        let id=Number(urlSplit[2])
            const sId=students.findIndex(item=>item.id===id)
            if(sId === -1){
               return res.end('Student not found')
            }
            students.splice(sId,1)
            res.write("Student removed successfully")
            res.end()
        }else{
            res.end("Page Not Found")
        } 
        }else{
            res.end("Page Not Found")
        }
    })
server.listen(4000,()=>{
    console.log(`server is running on port 4000`)
})