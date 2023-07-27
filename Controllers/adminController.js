const RegisterModel = require("../Models/adminRegisterModel");
const UsersModel = require("../Models/usersRegisterModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
mongoose.connect("mongodb://localhost/ansad");
module.exports = {
  register: async (req, res) => {
    try {
      const { fulname, username, password } = req.body;
      await RegisterModel.create({
        Fullname: fulname,
        Username: username,
        Password: password,
      });
      res.json("done");
    } catch (error) {
      console.log(error.message);
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const admin = await RegisterModel.exists({
        Username: username,
        Password: password,
      });
      const encrypt = jwt.sign(admin, process.env.ACCESS_TOKEN_SECRET);
      if (admin) {
        res.json("logged Token:" + encrypt);
      } else {
        res.json("failed");
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  authAdmin: async (req, res, next) => {
    const authhead = req.headers["authorization"];
    const token = authhead && authhead.split(" ")[1];

    const verify = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (verify == null) {
      // return sendStatus(401)
      res.json("failed");
    }
    next();
  },
  createusers: async (req, res) => {
    try {
      const { name, username, email, photo } = req.body;
      const user = await UsersModel.findOne({ username: username });
      if (user) {
        res.json(admin);
      } else {
        const create = await UsersModel.create({
          name: name,
          username: username,
          email: email,
          photo: photo,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  Getusers: async (req, res) => {
    try {
      const user = await UsersModel.find();
      res.json(user);
    } catch (error) {
      console.log(error.message);
    }
  },
  Getusersbyid: async (req, res) => {
    try {
        const user = await UsersModel.find();
        res.json(user[req.params.id]);
      } catch (error) {
        console.log(error.message);
      }
  },
  updateusers: async (req,res) => {
    try {
        const {name,username,email,photo}=req.body
        const s = await UsersModel.find(); 
        const objid=  s[req.params.id]._id
        if (name) {
            await UsersModel.findByIdAndUpdate(objid,{$set:{name:name}});    
        }
        if(username){
            await UsersModel.findByIdAndUpdate(objid,{$set:{username:username}});
        }
        if(email){
            await UsersModel.findByIdAndUpdate(objid,{$set:{email:email}});
        }
        if (photo) {
            await UsersModel.findByIdAndUpdate(objid,{$set:{photo:photo}});
        }
        
            
            res.json("updated");
        
      } catch (error) {
        console.log(error.message);
      }
  },
  Deleteusers: async (req,res) => {
    try {
        
        const s = await UsersModel.find(); 
        const objid=  s[req.params.id]._id
        await UsersModel.findByIdAndDelete(objid);
        
            
            res.json("deleted");
        
      } catch (error) {
        console.log(error.message);
      }
  },
};
