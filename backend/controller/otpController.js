const otpService = require("../service/otpService");

module.exports = {
  send_otp_to_email: async function (req, res) {
    try {
      const email = req.body.email;
      const type = req.body.type;
      if (!email) {
        const response = { Status: "Failure", Details: "Email not provided" };
        return res.status(400).send(response);
      }
      if (!type) {
        const response = { Status: "Failure", Details: "Type not provided" };
        return res.status(400).send(response);
      }

      const response = await otpService.send_otp(email, type);

      return res.send(response);
    } catch (error) {
      const response = { Status: "Failure", Details: error.message };
      return res.status(400).send(response);
    }
  },
  verify_otp: async function (req, res) {
    try {
      const { verification_key, otp, check } = req.body;
      console.log("1");
      if (!verification_key) {
        const response = {
          Status: "Failure",
          Details: "Verification Key not provided",
        };
        return res.status(400).send(response);
      }
      if (!otp) {
        const response = { Status: "Failure", Details: "OTP not Provided" };
        return res.status(400).send(response);
      }
      if (!check) {
        const response = { Status: "Failure", Details: "Check not Provided" };
        return res.status(400).send(response);
      }

      const response = await otpService.otp_verify(
        verification_key,
        otp,
        check
      );

      return res.send(response);
    } catch (err) {
      const response = { Status: "Failure1", Details: err.message };
      return res.status(400).send(response);
    }
  },
};
