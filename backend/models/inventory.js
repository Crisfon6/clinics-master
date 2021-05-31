const mongoose = require("mongoose");

//inventory collection
const inventorySchema = new mongoose.Schema({
  equipmentID: [String],
  clinicID: String,
  active:{type:Boolean,default:true},
});

const Inventory = mongoose.model("inventory", inventorySchema);

module.exports = Inventory;
