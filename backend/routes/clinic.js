const express = require("express");
const router = express.Router();
const Clinic = require("../models/clinic");
const User = require("../models/user");
const Auth = require("../middleware/auth");
const userDB = require("../middleware/userDB");
const dataCompleted = require("../middleware/validateData");
const contract = require("../contracts/clinic");

//create clinic
router.post(
  "/create",
  Auth,
  userDB,
  dataCompleted(contract.create),
  async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).send("Usuario no autenticado");
    if (!req.body.name || !req.body.description)
      return res.status(401).send("Incomplete data");

    const clinic = new Clinic({
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      userId: user._id,
    });
    const result = await clinic.save();
    return res.status(200).send({ result });
  }
);
//list clinics
router.get("/list", Auth, userDB, async (res, req) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(400).send("Usuario no autenticado");
  const clinic = await Clinic.find({ userId: req.user._id });
  return res.status(200).send({ clinic });
});

router.put(
  "/update",
  Auth,
  userDB,
  dataCompleted(contract.update),
  async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(401).send("El user no exite en db");
    const clinic = await Board.findByIdAndUpdate(req.body._id, {
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      userId: user._id,
    });
    if (!clinic) return res.status(401).send("No se pudo editar");
    return res.status(200).send({ clinic });
  }
);

router.delete("/:_id", Auth, userDB, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(401).send("El user no exite en db");
  const clinic = await Clinic.findByIdAndDelete(req.params._id);
  if (!clinic) return res.status(401).send("Error to delete clinic");
  return res.status(200).send({ mensaje: "clinic Deleted" });
});

module.exports = router;
