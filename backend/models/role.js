// importanto
const mongoose = require("mongoose");
const rolEsquema = new mongoose.Schema({
    name: String,
    description: String,
    active: {
        type: Boolean,
        default: true
    },
});

const Rol = mongoose.model("Rol", rolEsquema);
module.exports = Rol;