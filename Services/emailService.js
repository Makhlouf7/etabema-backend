import nodemailer from "nodemailer";

const TRANSPORTER = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.USERPASS,
  },
});

const sendEmail = async (to, subject, html) => {
  const email = {
    from: process.env.EMAIL,
    to,
    subject,
    html,
  };

  try {
    const info = await TRANSPORTER.sendMail(email);
    console.log("Email sent: " + info.response);
    return info;
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;
  }
};

// Loops through the subscribers list and send each an email
export default sendEmail;
