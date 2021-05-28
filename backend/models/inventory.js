const mongoose = require("mongoose");

//inventory collection
const inventorySchema = new mongoose.Schema({
  equipmentID: String,
  clinicID: String,
  active: Boolean,
});

const Inventory = mongoose.model("inventory", inventorySchema);

module.exports = Inventory;
