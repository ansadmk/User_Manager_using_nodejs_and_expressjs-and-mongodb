const mongoose=require("mongoose")
const UsersList=mongoose.Schema({
    name:String,
    username:String,
    email:String,
    photo:String,
})
module.exports=mongoose.model("UsersLists",UsersList)