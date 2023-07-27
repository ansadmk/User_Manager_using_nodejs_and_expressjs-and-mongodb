const express=require('express')
const Router=express.Router()
const bodyparser=require('body-parser')
const {register,login,authAdmin,createusers}=require("../Controllers/adminController")
const body=bodyparser.urlencoded({extended:false})
const jwt=require("jsonwebtoken")

Router.post('/register',register)
Router.post('/login',login)
Router.post('/users',authAdmin,createusers)
Router.get('/users',()=>{})
Router.get('/users/:id',()=>{})
Router.put('/users/:id',()=>{})
Router.delete('/users/:id',()=>{})
module.exports=Router


