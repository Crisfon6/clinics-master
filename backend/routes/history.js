const express = require("express");
const Historial = require("../models/history");
const User = require("../models/user");
const Inventary = require("../models/inventory");
const router = express.Router();
const Auth = require("../middleware/auth");
const userDB = require("../middleware/userDB");
const dataCompleted = require("../middleware/validateData");

router.post(
  "/registrarhistorial",
  Auth,
  userDB,
  dataCompleted,
  async (req, res) => {
    const user = await User.findById(req.user._id);
    const inventary = await Inventary.findById(req.inventary._id);
    const historial = new Historial({
      descrition: req.body.descrition,
      inventary: inventary._id,
      executeBy: user._id,
    });
    const result = await historial.save();
    return res.status(200).send({ result });
  }
);

module.exports = router;
