// src/utils/mail.js
const nodemailer = require("nodemailer");

// ✅ Create a single reusable transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // your Gmail address
    pass: process.env.PASS, // your App password
  },
});

async function sendOtp(to, otp) {
  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
      // You can also add HTML for styled emails
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>🔐 Your Verification Code</h2>
          <p>Your OTP is: <strong style="font-size: 20px;">${otp}</strong></p>
          <p>This code will expire in 5 minutes.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ OTP Email sent:", info.response);
    return info;
  } catch (err) {
    console.error("❌ Error sending OTP:", err);
    throw err;
  }
}

module.exports = sendOtp;



// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "Gmail", // ✅ use service instead of host
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASS,
//   },
// });

// // src/utils/mail.js

// async function sendOtp(to, otp) {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.MAIL_USER, // your gmail
//         pass: process.env.MAIL_PASS, // your app password (not gmail password)
//       },
//     });

//     const mailOptions = {
//       from: process.env.MAIL_USER,
//       to,
//       subject: "Your OTP Code",
//       text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log("OTP Email sent:", info.response);
//     return info;
//   } catch (err) {
//     console.error("Error sending OTP:", err);
//     throw err;
//   }
// }

// // ✅ Important: Export correctly
// module.exports = sendOtp;

