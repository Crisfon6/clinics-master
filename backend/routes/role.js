const express = require("express");
const Role = require("../models/role");
const router = express.Router();
const Auth = require("../middleware/auth");
const userDB = require("../middleware/userDB");
const validateData = require("../middleware/validateData");
const { haveRole } = require("../middleware/role");
const mongoose = require("mongoose");

// Register new users, a new user has an actitve status by default
router.post("/create", validateData, async(req, res) => {
    let role = await Role.findOne({ name: req.body.name });
    if (role) return res.status(401).send("Error: The role already exists.");

    role = new Role({
        name: req.body.name,
        description: req.body.description,
    });

    const result = await role.save();
    return res.status(200).send({ result });
});

router.get(
    "/getRole/:name?",
    Auth,
    userDB,
    haveRole("admin"),
    async(req, res) => {
        const role = await Role.find({
                name: new RegExp(req.params["name"], "i"),
            })
            .populate()
            .exec();
        if (!role) return res.status(200).send("No roles were found.");
        return res.status(200).send({ role });
    }
);

router.put(
    "/update",
    Auth,
    userDB,
    haveRole("admin"),
    validateData,
    async(req, res) => {
        const validId = mongoose.Types.ObjectId.isValid(req.body._id);
        if (!validId) return res.status(401).send("Error: Invalid id");

        role = await Role.findByIdAndUpdate(req.body._id, {
            name: req.body.name,
            description: req.body.description,
            active: req.body.active,
        }, { new: true });

        if (!role) return res.status(400).send("Error: Could not update role.");
        return res.status(200).send({ message: "Role updated successfully", role });
    }
);

router.put(
    "/delete/:_id",
    Auth,
    userDB,
    haveRole("admin"),
    validateData,
    async(req, res) => {
        const validId = mongoose.Types.ObjectId.isValid(req.body._id);
        if (!validId) return res.status(401).send("Error: Invalid id");

        let role = await Role.findByIdAndUpdate(req.params._id, {
            name: req.body.name,
            description: req.body.description,
            active: false,
        });

        if (!role) return res.status(400).send("Error: Could not update the role.");
        return res.status(200).send("Role " + req.body.name + " was deleted.");
    }
);

module.exports = router;