const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
module.exports = {
  updateUser: async (id, body) => {
    try {
      const getUser = await userModel.getUserById(id);
      // console.log(getUser);
      if (getUser) {
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
              // console.log(hashedPassword);
              const response = await userModel.updateUser(
                id,
                body,
                hashedPassword
              );
              // console.log(response);
            }
          }
        );

        return "User Updated.";
      }
      return "User does not  exist";
    } catch (e) {
      return e;
    }
  },
  getUserbyid: async (user_id) => {
    try {
      const response = await userModel.getUserById(user_id);
      if (response) {
        return response;
      }
      return "User does not  exist";
    } catch (e) {
      console.log(e);
    }
  },
};
