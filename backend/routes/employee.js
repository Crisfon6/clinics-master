const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");
const mongoose = require("mongoose");
const User = require("../models/user");
const Auth = require("../middleware/auth");
const userDB = require("../middleware/userDB");
const dataCompleted = require("../middleware/validateData");
const Upload = require("../middleware/file");
const Role = require("../middleware/role");
const contract = require("../contracts/employee");
/*Upload.single("CV")
 Auth
// userDB,*/
router.post(
    "/create",
    Auth,
    userDB,
    dataCompleted(contract.create),
    Upload.single("CV"),
    async(req, res) => {
        if (!req.body.userId || !!req.body.CV)
            return res.status(401).send("Incomplete data");

        if (req.params["error-pdf"])
            return res.status(401).send("The file must be a PDF");

  

        const url = req.protocol + "://" + req.get("host");
        let imgUrl = "";
        if (req.file !== undefined && req.file.filename)
            imgUrl = url + "/uploads/" + req.file.filename;

        let employee = new Employee({
            userId: req.body.userId,
            CV: imgUrl,
        });

        const result = await employee.save();

    if(result) return res.status(200).send({success:"Employee Registred Succesfully"})
    else return res.status(401).send({error:"Employee Registred Succesfully"});

    

   
  }
);

router.put(
    "/update",
    Auth,
    userDB,
    dataCompleted(contract.update),
    async(req, res) => {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(401).send("This user doesn't exist");

        //updating user
        const employee = await Employee.findByIdAndUpdate(req.body._id, {
            userId: req.body.userId,
            CV: req.body.CV,
        });

        return employee ?
            res.status(200).send("Employee Updated") :
            res.status(401).send("Erro Updaeting Employee");
    }
);

router.get(
    "/list",
    Auth,
    userDB,
    dataCompleted,
    Role.haveRole("admin", "employee"),
    async(req, res) => {
        const employees = await Employee.find()
            .populate({
                path: "userId",
                populate: {
                    path: "role",
                    model: "Rol",
                },
            })
            .exec();

        if (!employees) return res.status(401).send("Error Searching Employees");
        return res.status(200).send({ employees });
    }
);

module.exports = router;