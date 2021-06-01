const express = require("express");
const Role = require("../models/role");
const router = express.Router();
const Auth = require("../middleware/auth");
const User = require("../models/user");

router.post("/registerRol", async (req, res) => {
  let role = await Role.findOne({ name: req.body.name });
  if (role) return res.status(400).send("El rol ya existe");

  const role = new Rol({
    name: req.body.name,
    description: req.body.description,
    active: req.body.active,
  });

  const result = await role.save();
  return res.status(200).send({ result });
});

router.get("/getRoles", Auth, async (req, res) => {
  const role = await Role.find();
  if (!role)
    return res
      .status(400)
      .send("No se encontraron roles registrados en la BD.");
  return res.status(200).send({ role });
});

router.put("/updateRole", Auth, async (req, res) => {
  const rol = await Rol.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    description: req.body.description,
    active: req.body.active,
  });

  if (!rol) return res.status(400).send("El rol no se pudo actualizar");
  return res.status(200).send({ rol });
});

router.delete("/:_id", Auth, async (req, res) => {
  const user = await User.findbyId(req.user._id);
  if (!user)
    return res
      .status(400)
      .send("Usuario no autenticado, por favor inicie sesion.");

  const rol = await Rol.findByIdAndUpdate(req.params._id, {
    name: rol.name,
    description: rol.description,
    active: false,
  });

  if (!rol) return res.status(400).send("No se pudo eliminar el rol.");
  return res.status(200).send("Rol eliminado");
});

module.exports = router;