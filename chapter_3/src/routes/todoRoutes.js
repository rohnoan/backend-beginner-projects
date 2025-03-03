import express from 'express'
import db from '../db.js'
const router = express.Router()
//get todos
router.get('/',(req,res)=>{
    const getTodos=db.prepare('SELECT * FROM todo WHERE user_id=?')
    const todos=getTodos.all(req.userID)
    res.json(todos)
})
//create todos
router.post('/',(req,res)=>{
    
})
//update todos
router.put('/:id',(req,res)=>{

})

router.delete('/:id',(req,res)=>{

})

export default router