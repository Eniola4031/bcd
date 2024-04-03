const config = require("../config.json");
const { Sequelize } = require("sequelize");
const database = new Sequelize(config.db);
database
  .authenticate()
  .then(() => {
    console.log("database connecetd");
  })
  .catch((e) => {
    console.log(error);
  });
module.exports = database;
