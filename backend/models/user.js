//modules required 
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const moment = require("moment");


//Creating User Schema 

const userSchema = new mongoose.Schema({
    name:String,
    userName:String,
    password:String,
    email:String,
    phone:String,
    role:String,
    active:{type:Boolean,default:true},
    date:{type:Date,default:Date.now}
});

/* Method to generate an unique JWT  for the user according to the name, id  and iat*/
userSchema.methods.generateJWT=function(){
    return jwt.sign({
        _id:this._id,
        name:this.name,
        iat:moment().unix()
    },
    "routesLogin")
}

const User = mongoose.model("user",userSchema);

module.exports = User;
