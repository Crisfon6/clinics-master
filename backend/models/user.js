//modules required 
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const moment = require("moment");


//Creating User Schema 

const userSchema = new mongoose.Schema({
    avatar:String,
    name:String,
    userName:String,
    password:String,
    email:String,
    phone:String,
    role:{type:mongoose.Schema.ObjectId,ref:"Rol"},
    active:{type:Boolean,default:true},
    date:{type:Date,default:Date.now}
});

/* Method to generate an unique JWT  for the user according to the name, id  and iat*/
userSchema.methods.generateJWT=function(){
    return jwt.sign({
        _id:this._id,
        name:this.name,
        role:this.role,
        iat:moment().unix()
    },
    "routesLogin")
}

const User = mongoose.model("user",userSchema);

module.exports = User;
