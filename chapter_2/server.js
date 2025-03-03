const express = require('express')
const app=express()

const PORT = 8383
console.log("changes detection for nodemon")

//middleware

app.use(express.json());

let data=['rohan']

//endpoints-http verbs (method) or routes

//the method informs the nature of 
// request and the route is a further subdirectory

//basically we direct the request 
// to the body of code to respond appropriately 
// and these routes or locations are called endpoints.

//website endpoints - these are for sending html
// and typically come when a user enters a url 

app.get('/',(req,res)=>{
    //this is endpoint number 1
    res.send(`
        <body style="background:pink;
            color:blue">
            <h1 >DATA</h1>
            <p>${JSON.stringify(data)}</p>
            <a href="dashboard">dashboard</a>  
            <a href="api/data">api data</a>

        </body>
        `)
})

app.get('/dashboard',(req,res)=>{
    console.log('ooo now i hit the /dashboard')
    res.send(`<h1>DASHBOARD</h1><a href="/">home</a>`)
})

//api endpoints - non visual


//crud- create(post) read(get) update(put) delete(delete)

app.get('/api/data',(req,res)=>{
    console.log('this one was for data')
    res.send(data)
})

app.post('/api/data',(req,res)=>{
    //wants to create a user when clicked signup
    const newEntry=req.body
    console.log(newEntry)
    data.push(newEntry.name)
    res.sendStatus(201)

})

app.delete('/api/data',(req,res)=>{
    data.pop();
    console.log('deleted')
    res.sendStatus(203)
})

app.listen(PORT,()=>console.log(`started server at ${PORT}`))
