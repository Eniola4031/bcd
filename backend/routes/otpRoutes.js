const router = require("express").Router();
const { send_otp_to_email } = require("../controller/otpController");
const { verify_otp } = require("../controller/otpController");
router.post("/email/otp", send_otp_to_email);
router.post("/verify/otp", verify_otp);

module.exports = router;
