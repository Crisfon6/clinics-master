const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");
const mongoose = require("mongoose");
const User = require("../models/user");
const Auth = require("../middleware/auth");
const userDB = require("../middleware/userDB");
const dataCompleted = require("../middleware/validateData");
//const Role = require("../models/role");

router.post(
  "/registerEmployee",
  Auth,
  userDB,
  dataCompleted,
  async (req, res) => {
    let employee = new Employee({
      userId: req.body.userId,
      CV: req.body.CV,
    });

    const result = await employee.save();

    return result
      ? res.status(200).send("Employee Registred Succesfully")
      : res.status(401).send("Error Registering Employee");
  }
);

router.put(
  "/updatingEmployee",
  Auth,
  userDB,
  dataCompleted,
  async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(401).send("This user doesn't exist");

    //updating user
    const employee = await Employee.findByIdAndUpdate(req.body._id, {
      userId: req.body.userId,
      CV: req.body.CV,
    });

    return employee
      ? res.status(200).send("Employee Updated")
      : res.status(401).send("Erro Updaeting Employee");
  }
);

router.get("/getEmployees", Auth, userDB, dataCompleted, async (req, res) => {
  const employees = await Employee.aggregate().lookup({
    from: "users",
    localField: "userId",
    foreignField: "_id",
    as: "user",
  });

  if (!employees) return res.status(401).send("Error Searching Employees");
  return res.status(200).send({ employees });
});

module.exports = router;
