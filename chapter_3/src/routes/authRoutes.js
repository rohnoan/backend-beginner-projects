import express from 'express'
import bcrypt, { hash } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router=express.Router()

router.post('/register',(req,res)=>{
    console.log('test signup')
    const {username,password}=req.body
    const hashedPassword=bcrypt.hashSync(password,8)
    console.log(username,password)
    console.log('hi')
    try{
        const insertUser=db.prepare(`INSERT INTO  users( username,password)
            VALUES(?,?)`)
            const result=insertUser.run(username,hashedPassword)
            
            // default todo

            const defaultTodo=`helo :) add your first todo`
            const insertTodo=db.prepare(`INSERT INTO todos (user_id,task) 
            VALUES(?,?)`)
            insertTodo.run(result.lastInsertRowid,defaultTodo)
                console.log(insertTodo)
            //create token
             const token=jwt.sign({id:result.lastInsertRowid},process.env.JWT_SECRET,{expiresIn:'24h'})
             res.json({token})
    }catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }
})

router.post('/login',(req,res)=>{
    const {username,password}=req.body
    console.log('test login')
    console.log(username)
    try{

        const getUser=db.prepare(`SELECT * FROM users WHERE username=?`)
        const user = getUser.get(username)
        console.log(user)
        console.log(req.path)
        if(!user){return res.status(404).send({message:'user not found'})}
        const passwordIsValid=bcrypt.compareSync(password,user.password)
        if(!passwordIsValid){
            return res.status(401).send({
                message:'Incorrect. Youre embarrassing yourself.'
            })
        }
        console.log(user)
        const token=jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:'24h'})
        res.json({token})
    }catch(err){
        console.log(err.message)
        res.send(503)//internal server error
    }
    
})

export default router