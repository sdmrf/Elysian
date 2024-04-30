// Imports
import nodemailer from "nodemailer";

// Constants
import {
  MAIL_USER,
  MAIL_PASS,
  MAIL_HOST,
  MAIL_EMAIL,
} from "../constants/constants.js";

const sendMailOptions = (email: string, otp: string) => {
  const subject = `Your Elysian Furniture OTP`;
  const text = `Dear Valued Customer ${email},

    Thank you for choosing Elysian Furniture for your furnishing needs. We're excited to have you on board!
    
    As part of our commitment to ensuring the security of your account, we have generated a one-time password (OTP) for you to verify your email address. Please use the OTP below to complete the verification process:
    
    OTP: ${otp}
    
    If you did not request this OTP or have any concerns about your account security, please contact our customer support team immediately at codezeniths@gmail.com.
    
    Thank you for choosing Elysian Furniture. We look forward to serving you!
    
    Best regards,
    The Elysian Furniture Team`;

  return { subject, text };
};

const sendEmailHandler = async (email: string, otp: string) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    auth: {
      user: MAIL_EMAIL,
      pass: MAIL_PASS,
    },
  });

  const { subject, text } = sendMailOptions(email, otp);

  // Mail options
  const mailOptions = {
    from: MAIL_USER,
    to: email,
    subject: subject,
    text: text,
  };

  // Send mail
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export default sendEmailHandler;
