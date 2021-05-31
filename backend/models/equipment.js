const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
    name: String,
    definition: String,
    brand: String,
    modelEquip: String,
    serie: String,
    weight: Number,
    provider: String,
    invimaReg: String,
    usefulLife: String,
    noInvima: String,
    length: Number,
    width: Number,
    depth: Number,
    photo: String,
    active: Boolean,
});

const Equipment = mongoose.model("equipment",equipmentSchema);

module.exports = Equipment;


