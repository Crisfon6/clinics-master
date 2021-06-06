const expressvavalidators = require("express-validators");

const dataCompleted = (req, res, next) => {
    // const errors = expressvavalidators.validationResult(req);
    // console.log(req);
    if (errors) return res.status(401).send({ msg: errors.array() });
    next();
};
module.exports = dataCompleted;