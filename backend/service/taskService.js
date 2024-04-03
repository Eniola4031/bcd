const { log } = require("console");
const taskModel = require("../model/taskModel");

module.exports = {
  createtask: async (body) => {
    try {
      const existingtask = await taskModel.getTaskById(id);
      if (existingtask) {
        return { error: "task already exists" };
      }
      const response = await taskModel.createTask(body);
      console.log(response);
      const res = {
        Status: "Success",
        Details: "task Created.",
      };
      return res;
    } catch (error) {
      const response = { Status: "Failure", Details: "Unable to create task" };
      return response;
    }
  },
  gettaskbyid: async (id) => {
    try {
      const response = await taskModel.getTaskById(id);
      if (response) {
        return response;
      }
      return "task does not  exist";
    } catch (e) {
      console.log(e);
    }
  },
  updatetask: async (id, body) => {
    try {
      const gettask = await taskModel.getTaskById(id);
      if (gettask) {
        const response = await taskModel.updateTask(id, body);

        return response;
      }
      return "task does not  exist";
    } catch (e) {
      console.log(e);
    }
  },
  deletetask: async (id) => {
    try {
      const task = await taskModel.getTaskById(id);
      if (!task) {
        return "task does not  exist";
      }
      await taskModel.deleteTask(id);

      return "task delete Succcessfully.";
    } catch (e) {
      console.log(e);
    }
  },
  getAlltasks: async () => {
    try {
      const response = await taskModel.getAllTask();
      if (response) {
        return response;
      }
      return "task does not  exist";
    } catch (error) {
      const response = { Status: "Failure", Details: "Bad Request" };
      return response;
    }
  },
};
