//Importing needed modules
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");


/*Function to register new user, cheking  whether the user already exists*/
router.post("/registerUser",async(req,res)=>{
    //validating unique eMAIL
    let user = await User.findOne({email:req.body.email});
    if (user) return res.status(400).send("This user already exists");

    //encrypting password
    const hash = await bcrypt.hash(req.body.password,10);

    //creating user object 
    user = new User({
        name:req.body.name,
        userName:req.body.userName,
        email:req.body.email,
        password:hash,
        phone:req.body.phone,
        role:req.body.status
    })

    //saving user
    const result = await user.save();

    //Veriying result of save the user and generating jwt
    
    if(result){
        const jwtToken = user.generateJWT();
        res.status(200).send({jwtToken});
    }
    else{
        return res.status(200).send("Registration failed");
    }
});


router.put("/updateUser",async(req,res)=>{

    const user = await User.findById(req.user.id);
    if(!user) return res.status(401).send("This User doesn't exist");

    const userChanged = await User.findByIdAndUpdate(req.body._id,{
        name:req.body.name,
        userName:req.body.userName,
        email:req.body.email,
        phone:req.body.phone,
        role:req.body.role,
        active:req.body.active
    });

    if(!userChanged) return res.status(400).send("The user couln't be updated");

    return res.status(200).send({userChanged})
})


module.exports = router;