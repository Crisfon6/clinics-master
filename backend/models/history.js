const mongoose = require("mongoose");
const historySchema = new mongoose.Schema({
    description: String,
    date: {type: Date,
        default: Date.now},
        inventary: String,
        executeBy: String,
}) 

const History = mongoose.model("Historial", historySchema)
module.exports = History