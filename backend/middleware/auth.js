//modulo jwt
// const jwt = require("jsonwebtoken");
//validamos la autenticacion
const auth = (req, res, next) => {
  next();
};

//exportamos el modulo
module.exports = auth;
