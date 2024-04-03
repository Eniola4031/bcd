const { models } = require("./index");
module.exports = {
  findUserByEmail: async function (email) {
    return await models.User.findOne({
      where: {
        email,
      },
    });
  },
  createUser: async function (body, hashedPassword, token) {
    return await models.User.create({
      ...body,
      password: hashedPassword,
      token: token,
    });
  },
  getUserById: async function (id) {
    return await models.User.findByPk(id);
  },
  updateUser: async function (id, body, hashedPassword) {
    return await models.User.update(
      { ...body, password: hashedPassword },
      {
        where: {
          id,
        },
      }
    );
  },
  updateToken: async function (id, token) {
    return await models.User.update(
      { token: token },
      {
        where: {
          id,
        },
      }
    );
  },
};
