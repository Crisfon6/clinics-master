const express = require("express");
const Rol = require("../models/role");
const router = express.Router();
const Auth = require("../middleware/auth");
const userDB = require("../middleware/userDB");
const dataCompleted = require("../middleware/validateData");

router.post("/RegistrarRol", dataCompleted, async (req, res) => {
  const rol = await Rol.findOne({ name: req.body.name });
  if (rol) return res.status(400).send("El rol ya existe");
  const role = await req.body;
  console.log(role);
  const newRol = new Rol({
    name: req.body.name,
    description: req.body.description,
    active: req.body.active,
  });
  const result = await newRol.save();
  return res.status(200).send({ result });
});

router.get("/consultarroles", Auth, userDB, dataCompleted, async (req, res) => {
  const rol = await Rol.find({ name: req.body.name });
  return res.status(200).send({ rol });
});

router.put("/EditarRol", Auth, userDB, dataCompleted, async (req, res) => {
  const rol = await Rol.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    description: req.body.description,
    active: req.body.active,
  });

  if (!rol) return res.status(400).send("El rol no se pudo actualizar");

  return res.status(200).send({ rol });
});

router.delete("/:_id", Auth, userDB, dataCompleted, async (req, res) => {
  const rol = await Rol.findByIdAndDelete(req.params._id);
  if (!rol) return res.status(400).send("No se pudo eliminar el rol");
  return res.status(200).send("Rol eliminado");
});

module.exports = router;
