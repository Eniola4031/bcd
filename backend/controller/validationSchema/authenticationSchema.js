const joi = require("joi");
const schema = joi.object().keys({
  name: joi.string().required().error(new Error("Invalid name")),
  email: joi.string().email().required().error(new Error("Invalid email")),
  password: joi.string().required().error(new Error("Enter password")),
  dateOfBirth: joi.string().required().error(new Error("Enter date of birth")),
  gender: joi.string().required().error(new Error("Select gender")),
  country: joi.string(),
});
const loginSchema = joi.object().keys({
  email: joi.string().email().required().error(new Error("Invalid email")),
  password: joi.string().required().error(new Error("Enter password")),
});
module.exports = { schema, loginSchema };
