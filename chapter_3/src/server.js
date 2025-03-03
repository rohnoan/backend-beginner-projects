import express from 'express';
import path,{dirname} from 'path'
import {fileURLToPath} from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import authMiddleware from './middleware/authMiddleware.js';
const app=express()

const PORT= process.env.PORT || 5003

//get file path from url of the current module

const __filename=fileURLToPath(import.meta.url)
//get the directory name from file path

const __dirname=dirname(__filename)

// serve the html file from the /public directory and also 
//tell express to serve all files from the public folder as static assets / file 
app.use(express.json()); // Parses JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parses form data

app.use(express.static(path.join(__dirname,'../public')))
//serving html file from /public
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'))
})

//routes

app.use('/auth',authRoutes)
app.use('/todos',authMiddleware,todoRoutes)


app.listen(PORT,()=>{
    console.log(`server started on PORT : ${PORT}`)
})
