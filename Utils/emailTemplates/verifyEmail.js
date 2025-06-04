const verifyEmailTemplate = (verificationLink) => {
  return `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333">
  <h2 style="color: #123d47">Verify Your Subscription</h2>
  <p>
    Thank you for subscribing to our newsletter! Please verify your email
    address by clicking the button below:
  </p>
  <a
    href="${verificationLink}"
    style="
      display: inline-block;
      padding: 10px 20px;
      color: #fff;
      background-color: #123d47;
      text-decoration: none;
      border-radius: 5px;
    "
    >Verify Email</a
  >
  <p>If you did not subscribe, please ignore this email.</p>
  <p>Thanks,<br />— The Etabema Cosméticos Team</p>
</div>`;
};

export default verifyEmailTemplate;
