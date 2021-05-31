// modulo jwt
const jwt = require("jsonwebtoken");

// validamos autenticación
const auth = (req, res, next) => {
  // revisamos el header en su parte de autorización
  // extraemos el JWT generado del bloque de authorization del header
  let jwtToken = req.header("Authorization");
  // validamos si existe el JWT
  if (!jwtToken)
    return res.status(400).send("Autorización rechazada: no existe un token.");
  // si el JWT existe, vamos a separar el payload(parte de lJWT donde vienen los datos de user)
  // el token llega con la forma: "Bearer xxx.yyy.zzz", por lo tanto nos toca separar el bearer del token
  jwtToken = jwtToken.split(" ")[1];
  if (!jwtToken)
    return res.status(400).send("Autorización rechazada: no existe un token.");
  // validamos que el token se generado por el programa
  try {
    // revisamos la palabra secreta del payload
    const payload = jwt.verify(jwtToken, "routesLogin");
    // si la palaba es la misma y el token es correcto, el user puede continuar
    req.user = payload;
    next();
  } catch (error) {
    // mensaje de error
    return res
      .status(400)
      .send("Autorización rechazada: el token no es válido");
  }
};

// exportamos el modulo
module.exports = auth;