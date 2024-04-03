const authService = require("../service/authenticationService");
const {
  schema,
  loginSchema,
} = require("./validationSchema/authenticationSchema");
module.exports = {
  signup: async function (req, res) {
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ msg: error.message });
      }

      const response = await authService.createUser(req.body);
      res.send(response);
    } catch (e) {
      const response = { Status: "Failure", Details: e.message };
      return res.status(400).send(response);
    }
  },
  login: async function (req, res) {
    try {
      const { error } = loginSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ msg: error.message });
      }

      const response = await authService.login(req.body);
      return res.send(response);
    } catch (e) {
      const response = { Status: "Failure", Details: e.message };
      return res.status(400).send(response);
    }
  },
};
