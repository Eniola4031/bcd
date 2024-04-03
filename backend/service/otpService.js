var otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const otpModel = require("../model/otpModel");
const dotenv = require("dotenv").config();
const { encode, decode } = require("../middleware/crypt");
// Function to Compares dates (expiration time and current time in our case)
var dates = {
  convert: function (d) {
    // Converts the date in d to a date-object. The input can be:
    //   a date object: returned without modification
    //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
    //   a number     : Interpreted as number of milliseconds
    //                  since 1 Jan 1970 (a timestamp)
    //   a string     : Any format supported by the javascript engine, like
    //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
    //  an object     : Interpreted as an object with year, month and date
    //                  attributes.  **NOTE** month is 0-11.
    return d.constructor === Date
      ? d
      : d.constructor === Array
      ? new Date(d[0], d[1], d[2])
      : d.constructor === Number
      ? new Date(d)
      : d.constructor === String
      ? new Date(d)
      : typeof d === "object"
      ? new Date(d.year, d.month, d.date)
      : NaN;
  },
  compare: function (a, b) {
    // Compare two dates (could be of any type supported by the convert
    // function above) and returns:
    //  -1 : if a < b
    //   0 : if a = b
    //   1 : if a > b
    // NaN : if a or b is an illegal date
    return isFinite((a = this.convert(a).valueOf())) &&
      isFinite((b = this.convert(b).valueOf()))
      ? (a > b) - (a < b)
      : NaN;
  },
  inRange: function (d, start, end) {
    // Checks if date in d is between dates in start and end.
    // Returns a boolean or NaN:
    //    true  : if d is between start and end (inclusive)
    //    false : if d is before start or after end
    //    NaN   : if one or more of the dates is illegal.
    return isFinite((d = this.convert(d).valueOf())) &&
      isFinite((start = this.convert(start).valueOf())) &&
      isFinite((end = this.convert(end).valueOf()))
      ? start <= d && d <= end
      : NaN;
  },
};

module.exports = {
  send_otp: async function (email, type) {
    //Generate OTP
    const otp = otpGenerator.generate(6, {
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });
    // console.log(otp);
    const now = new Date();
    // console.log(now);
    const expiration_time = AddMinutesToDate(now, 10);
    // console.log(expiration_time);
    const otp_instance = await otpModel.createOTP(otp, expiration_time);
    // console.log(otp_instance);
    // Create details object containing the email and otp id
    var details = {
      timestamp: now,
      check: email,
      success: true,
      message: "OTP sent to user",
      otp_id: otp_instance.id,
    };
    // console.log(details);
    // Encrypt the details object
    const encoded = await encode(JSON.stringify(details));
    // console.log(encoded);
    //Choose message template according type
    if (type) {
      if (type == "VERIFICATION") {
        console.log("IN VERIFICATION");
        const {
          message,
          subject_mail,
        } = require("../templates/email/verification");
        email_message = message(otp);
        email_subject = subject_mail;
      } else if (type == "FORGET") {
        const { message, subject_mail } = require("../templates/email/forget");
        email_message = message(otp);
        email_subject = subject_mail;
      } else {
        const response = {
          Status: "Failure",
          Details: "Incorrect Type Provided",
        };
        return response;
      }
    }
    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "alyanalam780@gmail.com",
      to: `${email}`,
      subject: email_subject,
      text: email_message,
    };

    await transporter.verify();

    //Send Email
    // await transporter.sendMail(mailOptions, (err, response) => {
    //   if (err) {
    //     const response = {
    //       Status: "Failure",
    //       Details: err,
    //     };
    //     console.log(response);
    //     return response;
    //   } else {
    //     // return res.send({ Status: "Success", Details: encoded });
    //     return res.send({ Status: "Success" });
    //   }
    // });
    // Send Email
    await transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        // console.log(err);
        // Handle the error here, maybe log it or return a response
        const errorResponse = {
          Status: "Failure",
          Details: err.message,
        };
        // console.error(errorResponse);
        return errorResponse;
        // Handle the error accordingly, e.g., return a response or log it
      } else {
        // console.log("Email sent successfully");
        // Handle the success case, e.g., return a success response
        const successResponse = {
          Status: "Success",
          // Details: "Email sent successfully",
          Details: encoded,
        };

        return successResponse;
        // Handle the success accordingly, e.g., return a response or log it
      }
    });

    // To add minutes to the current time
    function AddMinutesToDate(date, minutes) {
      return new Date(date.getTime() + minutes * 60000);
    }
  },
  // verify otp
  otp_verify: async function (verification_key, otp, check) {
    let decoded;
    var currentdate = new Date();

    //Check if verification key is altered or not and store it in variable decoded after decryption
    try {
      decoded = await decode(verification_key);
    } catch (err) {
      const response = { Status: "Failure", Details: "Bad Request" };
      return res.status(400).send(response);
    }
    var obj = JSON.parse(decoded);
    const check_obj = obj.check;
    // console.log(check_obj);

    // Check if the OTP was meant for the same email or phone number for which it is being verified
    if (check_obj != check) {
      const response = {
        Status: "Failure",
        Details: "OTP was not sent to this particular email or phone number",
      };
      return res.status(400).send(response);
    }
    const otp_instance = await otpModel.findOTP(obj.otp_id);
    // console.log(otp_instance);
    //Check if OTP is available in the DB
    if (otp_instance != null) {
      //Check if OTP is already used or not
      if (otp_instance.verified != true) {
        //Check if OTP is expired or not
        if (dates.compare(otp_instance.expiration_time, currentdate) == 1) {
          //Check if OTP is equal to the OTP in the DB
          if (otp === otp_instance.otp) {
            // Mark OTP as verified or used
            otp_instance.verified = true;
            otp_instance.save();

            const response = {
              Status: "Success",
              Details: "OTP Matched",
              Check: check,
            };
            return response;
          } else {
            const response = { Status: "Failure", Details: "OTP NOT Matched" };
            return response;
          }
        } else {
          const response = { Status: "Failure", Details: "OTP Expired" };
          return response;
        }
      } else {
        const response = { Status: "Failure", Details: "OTP Already Used" };
        return response;
      }
    } else {
      const response = { Status: "Failure", Details: "Bad Request" };
      return response;
    }
  },
};
