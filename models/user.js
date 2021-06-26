const mongoose = require("mongoose");
const Schema = mongoose.Schema
const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    phone_number:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
//console.log(UserSchema)

User = mongoose.model("User",UserSchema);
//console.log(User)
module.exports = User;