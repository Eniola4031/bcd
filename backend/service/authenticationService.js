const { response } = require("express");
const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
module.exports = {
  createUser: async function (body) {
    try {
      const existingUser = await userModel.findUserByEmail(body.email);
      if (existingUser) {
        return { error: "User already exists" };
      }
      // create token
      const token = jwt.sign({ email: body.email }, process.env.TOKEN_KEY, {
        expiresIn: "2h",
      });
      //hashed password
      const saltRounds = 10;
      const plaintextPassword = body.password;
      bcrypt.hash(
        plaintextPassword,
        saltRounds,
        async function (err, hashedPassword) {
          if (err) {
            return { error: "Re-Type Password" };
          } else {
            const response = await userModel.createUser(
              body,
              hashedPassword,
              token
            );
            // console.log(response);
          }
        }
      );
      return "User Create.";
    } catch (error) {
      console.log(error);
    }
  },

  login: async function (body) {
    try {
      const existingUser = await userModel.findUserByEmail(body.email);
      // console.log(existingUser);
      if (existingUser) {
        const plaintextPassword = body.password;

        const hashedPasswordFromDatabase = existingUser.dataValues.password;

        const result = await bcrypt.compare(
          plaintextPassword,
          hashedPasswordFromDatabase
        );

        if (result) {
          // create token
          if (existingUser.dataValues.token == null) {
            const token = jwt.sign(
              { email: body.email },
              process.env.TOKEN_KEY,
              {
                expiresIn: "2h",
              }
            );
            userModel.updateToken(existingUser.dataValues.id, token);
          }
          return existingUser;
        } else {
          return "Password incorrect";
        }
      } else {
        return "Signup first";
      }
    } catch (error) {
      console.log(error);
    }
  },
};
