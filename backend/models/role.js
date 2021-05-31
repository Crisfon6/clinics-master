// importanto
const mongoose = require("mongoose");
const rolEsquema = new mongoose.Schema({
  name: String,
  description: String,
  active: Boolean,
});

const Rol = mongoose.model("Rol", rolEsquema);
module.exports = Rol;
