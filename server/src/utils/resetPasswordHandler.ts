//* Import nodemailer module
import nodemailer from "nodemailer";

//* Import constants
import {
  MAIL_USER,
  MAIL_PASS,
  MAIL_HOST,
  MAIL_EMAIL,
} from "../constants/constants.js";

const createMailOptions = (email: string, resetLink: string) => {
  const subject = "Password Reset Request";
  const text =
    `Dear Valued Customer ${email},\n\n` +
    `We have received a request to reset your password for your account with Elysian Furniture. ` +
    `To proceed with the password reset, please click on the link below:\n` +
    `Password Reset Link : ${resetLink}\n` +
    `If you did not initiate this password reset or have any concerns about your account security, ` +
    `please contact our customer support team immediately at codezeniths@gmail.com.\n\n` +
    `Thank you for choosing Elysian Furniture.\n\n` +
    `Best regards,\n` +
    `The Elysian Furniture Team`;

  return { subject, text };
};

const sendPasswordResetLink = async (email: string, link: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      auth: {
        user: MAIL_EMAIL,
        pass: MAIL_PASS,
      },
    });

    const { subject, text } = createMailOptions(email, link);

    const mailOptions = {
      from: MAIL_USER,
      to: email,
      subject: subject,
      text: text,
    };
    // Send mail
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export { sendPasswordResetLink } 
