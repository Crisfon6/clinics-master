const Equipment = require('../models/equipment');
const express = require("express");
const router = express.Router();
router.post('', async(req, res) => {
    const {
        name,
        definition,
        brand,
        modelEquip,
        serie,
        weight,
        provider,
        invimaReg,
        usefulLife,
        noInvima,
        length,
        width,
        depth,
        photo,

    } = req.body;
    const newEquipment = new Equipment({
        name,
        definition,
        brand,
        modelEquip,
        serie,
        weight,
        provider,
        invimaReg,
        usefulLife,
        noInvima,
        length,
        width,
        depth,
        photo,
    });

    const savedEquipment = await newEquipment.save();
    res.status(200).send({ items: savedEquipment });
});