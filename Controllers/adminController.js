const RegisterModel=require('../Models/adminRegisterModel')
const UsersModel=require("../Models/usersRegisterModel")
const mongoose=require('mongoose')
const jwt=require("jsonwebtoken")
require("dotenv").config()
mongoose.connect("mongodb://localhost/ansad")
module.exports={
    register: async (req,res)=>{
       try {
        const {fulname,username,password}=req.body
        await RegisterModel.create({
            Fullname:fulname,
            Username:username,
            Password:password
        })  
        
       } catch (error) {
        console.log(error.message);
          } 
        

    },
    login: async (req,res)=>{
        try {
            const {username,password}=req.body
            const admin= await RegisterModel.exists({Username:username,Password:password})
            const encrypt=jwt.sign(admin,process.env.ACCESS_TOKEN_SECRET)
            if (admin) {
                res.json("logged Token:"+encrypt);
            } else {
                res.json("failed");
            }
        } catch (error) {
            console.log(error.message);
        }
    },
    authAdmin:async (req,res,next)=>{
        const authhead=req.headers['Authorization']
        console.log(authhead);
        const token=authhead && authhead.split(" ")[1]
         
        const verify=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        if (verify!=null) {
        res.json({
            log:"success"
        })
            
        } else {
        // return sendStatus(401)
        res.json('failed')
            
        }
        next()
    },
    createusers: async (req,res)=>{
        try {
            const {name,username,email,photo}=req.body
            const user= await UsersModel.findOne({username:username})
            if (user) {
                res.json(admin)
            } else {
               const create=  await UsersModel.create({name:name,username:username,email:email,photo:photo})
                 res.json(create)
            }
        } catch (error) {
            console.log(error.message);
        }
    },
    Getusers: async ()=>{},
    Getusersbyid: async ()=>{},
    updateusers: async ()=>{},
    Deleteusers: async ()=>{}



    

}