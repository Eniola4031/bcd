//index file of model
const sequelize = require("../bin/dbConnection");
const { User } = require("../model/entities/User");
const { OTP } = require("./entities/OTP");
const { Task } = require("./entities/Task");
const db = {};

const models = {
  User,
  OTP,
  Task,
};
sequelize.model = models;
db.sequelize = sequelize;
module.exports = { db, models };
