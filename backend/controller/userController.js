const userService = require("../service/userService");
const { schema } = require("./validationSchema/authenticationSchema");

module.exports = {
  updateUser: async function (req, res) {
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ msg: error.message });
      }
      id = req.query.user_id;
      const response = await userService.updateUser(id, req.body);

      res.send(response);
    } catch (e) {
      const response = { Status: "Failure", Details: e.message };
      return res.status(400).send(response);
    }
  },
  getUser: async function (req, res) {
    try {
      const user_id = req.body.user_id;
      const response = await userService.getUserbyid(user_id);
      res.send(response);
    } catch (e) {
      const response = { Status: "Failure", Details: e.message };
      return res.status(400).send(response);
    }
  },
};
