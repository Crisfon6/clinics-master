const Equipment = require("../models/equipment");
const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth");
const userDB = require("../middleware/userDB");
const dataCompleted = require("../middleware/validateData");
const contract = require("../contracts/equipment");
router.post(
  "/create",
  Auth,
  userDB,
  dataCompleted(contract.create),
  async (req, res) => {
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
  }

  /**************UPDATE EQUIPMENT************* */
);
module.exports = router;
