const express=require("express")
const Router=require('./Views/Routers')
const app=express()
const bodyparser=require("body-parser")
//app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.use("/",Router)
app.listen(3000)
console.log("running on http://localhost:3000");