const express = require("express");
const router = express.Router();

const History = require("../models/history");
const User = require("../models/user");
const Inventory = require("../models/inventory");
const Auth = require("../middleware/auth");

router.post("/saveHistory", Auth, async (req, res) => {
  const user = await User.findById(req.body.executeBy);
  const inventory = await Inventory.findById(req.body.idIntentory);
  if (!user || !inventory) return res.status(400).send("Incomplete Data.");

  const history = new History({
    description: req.body.descrition,
    executeBy: req.body.executeBy,
    inventory: req.body.inventory,
  });

  const result = await history.save();
  return res.status(200).send({ result });
});

router.get("/getHistory", Auth, async (req, res) => {
  const history = await History.find({ executeBy: req.user._id });
  if (!history) return res.status(400).send("History not found.");
  return res.status(200).send({ historial });
});

router.put("/editHistory", Auth, async (req, res) => {
  const history = await History.findByIdAndUpdate(req.body._id, {
    description: req.body.description,
    executeBy: req.body.executeBy,
    inventory: req.body.inventory,
  });

  if (!history) return res.status(400).send("History could not be updated.");
  return res.status(200).send({ history });
});

router.put("/:_id", Auth, async (req, res) => {
  const history = await History.findByIdAndUpdate(req.params._id, {
    
  });
  if (!history) return res.status(400).send("History could not be deleted.");
  return res.status(200).send("History deleted.");
});

module.exports = router;