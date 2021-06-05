const mongoose = require("mongoose");

// Historial representa los mantenimientos realizados a un equipo.
const historySchema = new mongoose.Schema({
  description: String,
  executeBy: { type: mongoose.Schema.ObjectId, ref: "user" },
  equipment: { type: mongoose.Schema.ObjectId, ref: "equipment" },
  status: { type: String, default: true },
  date: { type: Date, default: Date.now },
});

const History = mongoose.model("History", historySchema);
module.exports = History;