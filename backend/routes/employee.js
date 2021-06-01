const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");
const mongoose = require("mongoose");
const User = require("../models/user");
const Auth = require("../middleware/auth");
//const Role = require("../models/role");

router.post("/registerEmployee", Auth, async(req,res)=>{
    const user = await User.findById(req.body.userId);
    if(!user) return res.status(401).send("This User doesn't exist");

    //const role = await Role.findById(user.role)
    //if(role.name === 'admin') return res.status(401).send("You must be a admin to register a employee")

    let employee = new Employee({
        userId:req.body.userId,
        CV:req.body.CV
    })

    const result = await employee.save();

   return result?res.status(200).send("Employee Registred Succesfully"):res.status(401).send("Error Registering Employee")
})

router.put("/updatingEmployee", Auth, async(req,res)=>{

    const user = await User.findById(req.user._id);
    if(!user) return res.status(401).send("This user doesn't exist");

    //updating user
    const employee = await Employee.findByIdAndUpdate(req.body._id,{
        userId:req.body.userId,
        CV:req.body.CV
    })

    return employee?res.status(200).send("Employee Updated"):res.status(401).send("Erro Updaeting Employee")

})

router.get("/getEmployees", Auth, async(req,res)=>{

    const user = await User.findById(req.user._id);
    if(!user) return res.status(401).send("This User doesn't exist");

    //const role = await Role.findById(user.role)
    //if(role.name === 'admin') return res.status(401).send("You must be a admin to register a employee")


    const employees = await Employee.aggregate().lookup({ 
        from: 'users', localField: 'userId', foreignField: '_id', as: 'user' }
        ).exec((err, images) => {
            console.log(err,images);
})

    if(!employees) return res.status(401).send("Error Searching Employees")
    return res.status(200).send({employees})
})


module.exports = router;