const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth");
const Clinic = require("../models/clinic");
const Inventory = require("../models/inventory");
// const Equipment = require("../models/Equipment");
const User = require("../models/user");

router.post("/saveInventory", Auth, async(req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(400).send("Usuario no autenticado");

    const clinic = await Clinic.findById(req.clinic._id);
    if (!clinic) return res.status(400).send("Clinica no encontrada");

    const equipment = await Equipment.findById(req.equipment._id);
    if (!equipment) return res.status(400).send("equipamento no encontrada");

    const inventory = new Inventory({
        equipmentID: req.equipment._id,
        clinicID: req.clinic._id,
        active: true,
    });
    const result = await inventory.save();
    return res.status(200).send({ result });
});

router.get("listInventory", Auth, async(req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(401).send("El user no exite en db");

    const inventory = await Inventory.find({ userId: req.user._id });
    return res.status(200).send({ inventory });
});

router.put("/updateInventory", Auth, async(req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(401).send("El user no exite en db");

    const inventory = await Inventory.findByIdAndUpdate(req.body._id, {
        userId: user._id,
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
    });
    if (!inventory) return res.status(401).send("No se pudo editar");
    return res.status(200).send({ inventory });
});

router.delete("/:_id", Auth, async(req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(401).send("El user no exite en db");
    const inventory = await Inventory.findByIdAndDelete(req.params._id);
    if (!inventory) return res.status(401).send("Error to delete task");
    return res.status(200).send({ mensaje: "task deleted" });
});

module.exports = router;