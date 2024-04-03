const { models } = require("./index");
module.exports = {
  createOTP: async function (otp, expiration_time) {
    return await models.OTP.create({ otp, expiration_time });
  },
  findOTP: async function (otp_id) {
    return await models.OTP.findOne({ where: { id: otp_id } });
  },
};
