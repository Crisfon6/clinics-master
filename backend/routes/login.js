// ruta para realizar la autenticación del usuario
// modulo express y Router
const express = require("express");
const router = express.Router();

// importamos el modelo usuario
const User = require("../models/user");
// importamos bcrypt para poder desencriptar la contraseña
const bcrypt = require("bcrypt");

// función login de usuario
router.post("/login", async (req, res) => {
  // buscamos el correo de usuario
  const user = await User.findOne({ email: req.body.email });
  // validamos si hay resultados
  if (!user) return res.status(400).send("Email o contraseña incorrectos.");
  // comparamos el password que entra con el hash de la BD
  // compare: primer argumento la contraseña que recibo
  // segundo argumento la contraseña de la BD con la que tengo que comparar
  const hash = await bcrypt.compare(req.body.password, user.password);

  // validamos si la password coincide
  if (!hash) return res.status(400).send("Email o password incorrectos.");

  // devolvemos un token
  const jwtToken = user.generateJWT();
  return res.status(200).send({ jwtToken });
});

// exportamos el modulo
module.exports = router;
