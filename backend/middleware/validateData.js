const Joi = require("joi");

const valedateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    console.log(error);
    if (error) {
      const errorMessage = error.details.map((error) => error.message);
      return res.status(401).json({ message: errorMessage });
    }

    next();
  };
};

module.exports = valedateBody;
