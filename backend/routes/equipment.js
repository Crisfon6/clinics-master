const Equipment = require("../models/equipment");
const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth");
const userDB = require("../middleware/userDB");
const dataCompleted = require("../middleware/validateData");
const contract = require("../contracts/equipment");

router.get("/list", Auth, async(req, res) => {
    const q = { state: true };
    const { skip = 0, limit = 30 } = req.params;
    const results = await Equipment.find(q)
        .skip(Number(skip))
        .limit(Number(limit)).exec();
    res.status(200).send({ items: results });
});

router.post(
    "/create",
    Auth,
    userDB,
    dataCompleted(contract.create),
    async(req, res) => {
        const newEquipment = new Equipment({
            name: req.body.name,
            definition: req.body.definition,
            brand: req.body.brand,
            modelEquip: req.body.modelEquip,
            serie: req.body.serie,
            weight: req.body.weight,
            provider: req.body.provider,
            invimaReg: req.body.invimaReg,
            usefulLife: req.body.usefulLife,
            noInvima: req.body.noInvima,
            length: req.body.length,
            width: req.body.width,
            depth: req.body.depth,
            photo: req.body.photo,
        });

        const savedEquipment = await newEquipment.save();
        res.status(200).send({ items: savedEquipment });
    }

);
/**************UPDATE EQUIPMENT************* */
router.put("/update/_:id", Auth, userDB, dataCompleted(contract.create),
    async(req, res) => {
        const updated = await Equipment.findByIdAndUpdate(req.params._id, {
            name: req.body.name,
            definition: req.body.definition,
            brand: req.body.brand,
            modelEquip: req.body.modelEquip,
            serie: req.body.serie,
            weight: req.body.weight,
            provider: req.body.provider,
            invimaReg: req.body.invimaReg,
            usefulLife: req.body.usefulLife,
            noInvima: req.body.noInvima,
            length: req.body.length,
            width: req.body.width,
            depth: req.body.depth,
            photo: req.body.photo,
        }, { new: true });
        res.status(200).send({ items: updated });
    });

router.put("/delete/_:id", Auth, async(req, res) => {
    const updated = await Equipment.findByIdAndUpdate(req.params._id, { state: false });
    res.status(200).send({ items: updated })
});
router.delete("/_:id", Auth, async(req, res) => {
    const updated = await Equipment.remo(req.params._id, { state: false });
    res.status(200).send({ items: updated })
});
module.exports = router;