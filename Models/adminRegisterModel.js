const mongoose=require("mongoose")
const UsersList=mongoose.Schema({
    Fullname:String,
    Username:String,
    Password:String,
})
module.exports=mongoose.model("adminLists",UsersList)