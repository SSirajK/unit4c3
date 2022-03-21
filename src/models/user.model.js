const mongoose = require("mongoose")

const { body, validationResult} = require("express-validator")

const userSchema = new mongoose.Schema({
    firstName: { type:String, required:true},
    lastName: { type:String, required:false},
    age: { type:String, required:true},
    email: { type:String, required:true, unique:true},
    profileImages: { type:String, required:true}
},
{
    timestamps:true
})

const user = mongoose.model("user", userSchema)
module.exports = user;