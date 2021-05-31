//modules required 
const mongoose = require("mongoose");


const employeeSchema = new mongoose.Schema({
    userId:String,
    CV:String,
})

const Employee = mongoose.model("employee",employeeSchema);

module.exports = Employee;