import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (msg) => {
  msg = {
    ...msg,
    trackingSettings: {
      clickTracking: {
        enable: false,
        enableText: false,
      },
    },
  };
  try {
    const response = await sgMail.send(msg);
    console.log("Email sent successfully:");
    return response;
  } catch (error) {
    console.error("💥 Error sending email:", error);
    throw new Error("💥 Failed to send email");
  }
};

export default sendEmail;
