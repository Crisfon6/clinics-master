const dataCompleted = (req, res, next) => {
  Object.values(req.body).forEach((element) => {
    if (!element) return res.status(401).send("Incomplete data");
  });
  next();
};
module.exports = dataCompleted;
