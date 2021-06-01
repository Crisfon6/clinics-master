const User = require("../models/user");

const userDB = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(401).send("User without permission");
  next();
};

module.exports = userDB;