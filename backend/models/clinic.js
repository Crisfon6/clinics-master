const mongoose = require("mongoose");

//clinic colection
const clinicSchema = new mongoose.Schema({
  name: String,
  description: String,
  location: String,
  userId: String,
  active: { type: Boolean, default: true },
});

const Clinic = mongoose.model("clinic", clinicSchema);

module.exports = Clinic;
