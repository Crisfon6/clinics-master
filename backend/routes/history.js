const express = require("express");
const History = require("../models/history");
const User = require("../models/user");
const Equipment = require("../models/equipment");
const router = express.Router();
const Auth = require("../middleware/auth");
const userDB = require("../middleware/userDB");
const validateData = require("../middleware/validateData");
const haveRole = require("../middleware/role");
const mongoose = require("mongoose");

router.post(
  "/newHistory",
  Auth,
  userDB,
  // haveRole("admin", "user"),
  validateData,
  async (req, res) => {
    let validId = mongoose.Types.ObjectId.isValid(req.body.equipment);
    if (!validId) return res.status(400).send("Error: Invalid equipment id.");
    const equipment = await Equipment.findById(req.body.equipment);
    if (!equipment) return res.status(400).send("Error: Equipment not found.");

    validId = mongoose.Types.ObjectId.isValid(req.body.executeBy);
    if (!validId) return res.status(400).send("Error: Invalid user id.");
    const user = await User.findById(req.body.executeBy);
    if (!user) return res.status(400).send("Error: User not found.");

    const history = new History({
      description: req.body.description,
      equipment: req.body.equipment,
      executeBy: req.body.executeBy,
    });
    const result = await history.save();
    if (!result) return res.status(401).send("Error: History was not created.");
    return res.status(200).send({ result });
  }
);

router.get("/getHistory/:id", Auth, userDB, validateData, async (req, res) => {
  const validId = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!validId) return res.status(400).send("Error: Invalid id.");

  let history = await History.findById(req.params.id)
    .populate({ path: "executeBy equipment", select: "name" })
    .exec();

  if (!history) return res.status(401).send("No history were found.");
  return res.status(200).send({ history });
});

router.put("/editHistory", Auth, userDB, validateData, async (req, res) => {
  const validId = mongoose.Types.ObjectId.isValid(req.body._id);
  if (!validId) return res.status(400).send("Error: Invalid id.");

  const history = await History.findByIdAndUpdate(req.body._id, {
    description: req.body.description,
    equipment: req.body.equipment,
    executeBy: req.body.executeBy,
    status: req.body.status,
  });

  if (!history) return res.status(401).send("No history were found.");
  return res.status(200).send({ history });
});

router.put("/deleteHistory", Auth, userDB, validateData, async (req, res) => {
  const validId = mongoose.Types.ObjectId.isValid(req.body._id);
  if (!validId) return res.status(400).send("Error: Invalid id.");

  const history = await History.findByIdAndUpdate(req.body._id, {
    description: req.body.description,
    equipment: req.body.equipment,
    executeBy: req.body.executeBy,
    status: false,
  });

  if (!history) return res.status(401).send("No history were deleted.");
  return res.status(200).send("The history was deleted");
});

module.exports = router;
