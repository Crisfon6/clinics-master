const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  description: String,
  executeBy: String,
  inventory: String,
  status: { type: String, default: true },
  date: { type: Date, default: Date.now },
});

const History = mongoose.model("History", historySchema);
module.exports = History;