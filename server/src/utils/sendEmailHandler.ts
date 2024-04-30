// Import nodemailer module
import nodemailer from "nodemailer";

// Import constants
import {
  MAIL_USER,
  MAIL_PASS,
  MAIL_HOST,
  MAIL_EMAIL,
} from "../constants/constants.js";

// Function to create email options
const createMailOptions = (email: string, otp: string) => {
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

// Function to send email
const sendEmailHandler = async (email: string, otp: string) => {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      auth: {
        user: MAIL_EMAIL,
        pass: MAIL_PASS,
      },
    });

    // Get mail options
    const { subject, text } = createMailOptions(email, otp);

    // Set mail options
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

export { sendEmailHandler };
