//modules required 
const mongoose = require("mongoose");


const employeeSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.ObjectId,ref:"user"},
    CV:String,
})

const Employee = mongoose.model("employee",employeeSchema);

module.exports = Employee;