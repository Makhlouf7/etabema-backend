const emailUnsubscribedTemplate = () => {
  return `<div style="font-family: Arial, sans-serif; text-align: center; padding: 40px">
    <h1 style="color: #123d47;">You Have Unsubscribed</h1>
    <p>
    You have successfully unsubscribed from Etabema
    Cosméticos updates. We're sorry to see you go!
    </p>
    <a href="https://etabema.com" style="display: inline-block; margin-top: 20px; background: #123d47; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;">
      Return to Homepage
    </a>
  </div>`;
};

export default emailUnsubscribedTemplate;
