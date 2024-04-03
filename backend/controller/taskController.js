const taskService = require("../service/taskService");
module.exports = {
  createtask: async function (req, res) {
    try {
      const response = await taskService.createtask(req.body);
      console.log(response);
      return res.status(400).json(response);
    } catch (error) {
      const response = { Status: "Failure", Details: error.message };
      return res.status(400).send(response);
    }
  },
  gettaskById: async function (req, res) {
    try {
      const id = req.body.id;
      const response = await taskService.gettaskbyid(id);
      res.send(response);
    } catch (e) {
      const response = { Status: "Failure", Details: e.message };
      return res.status(400).send(response);
    }
  },
  updatetask: async function (req, res) {
    try {
      id = req.query.id;
      const response = await taskService.updatetask(id, req.body);

      res.send(response);
    } catch (e) {
      const response = { Status: "Failure", Details: e.message };
      return res.status(400).send(response);
    }
  },
  deletetask: async function (req, res) {
    try {
      const { id } = req.params;
      const response = await taskService.deletetask(id);
      res.send(response);
    } catch (error) {
      const response = { Status: "Failure", Details: error.message };
      return res.status(400).send(response);
    }
  },
  getAlltasks: async function (req, res) {
    try {
      const response = await taskService.getAlltasks();
      res.send(response);
    } catch (error) {
      const response = { Status: "Failure", Details: error.message };
      return res.status(400).send(response);
    }
  },
};
