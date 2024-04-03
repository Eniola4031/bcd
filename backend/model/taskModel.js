const { Task } = require("./entities/Task");
const { models } = require("./index");
module.exports = {
  getAllTask: async function () {
    return await models.Task.findAll();
  },

  createTask: async function (body) {
    return await models.Task.create({ ...body });
  },
  getTaskById: async function (id) {
    return await models.Task.findByPk(id);
  },
  updateTask: async function (id, body) {
    return await models.Task.update(
      { ...body },
      {
        where: {
          id,
        },
      }
    );
  },
  deleteTask: async function (id) {
    return await models.Task.destroy({
      where: {
        id,
      },
    });
  },
};
