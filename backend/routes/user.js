//Importing needed modules
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const Auth = require("../middleware/auth");
const userDB = require("../middleware/userDB");
const dataCompleted = require("../middleware/validateData");
const contract = require("../contracts/user");
const Upload = require("../middleware/file");

/*Function to register new user, cheking  whether the user already exists*/
  //Upload.single("image"),
router.post(
    "/create",
    dataCompleted(contract.create),
    Upload.single("image"),
    async(req, res) => {
        if (req.params["error-image"])
            return res.status(401).send("The file must be a image");

        //validating unique eMAIL
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send("This user already exists");

        //encrypting password
        const hash = await bcrypt.hash(req.body.password, 10);

        const url = req.protocol + "://" + req.get("host");
        let hvUrl = "";
        if (req.file !== undefined && req.file.filename)
            hvUrl = url + "/uploads/" + req.file.filename;

        //creating user object
        user = new User({
            avatar: hvUrl,
            name: req.body.name,
            userName: req.body.userName,
            email: req.body.email,
            password: hash,
            phone: req.body.phone,
            role: req.body.role,
        });

    //saving user
    const result = await user.save();
  
    if (result) {
      const idRes = result._id 
      res.status(200).send({idRes});
    } else {
      return res.status(200).send("Registration failed");
    }
  });

router.put(
    "/update/:_id",
    Auth,
    userDB,
    dataCompleted(contract.update),
    async(req, res) => {
        const userChanged = await User.findByIdAndUpdate(req.params._id, {
            avatar: req.body.hvUrl,
            name: req.body.name,
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            role: req.body.role,
            active: req.body.active,
        });

        if (!userChanged)
            return res.status(400).send("The user couln't be updated");

        return res.status(200).send({ userChanged });
    }
);

module.exports = router;