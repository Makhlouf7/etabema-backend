const orderEmailTemplate = (orderCode, orderStatus) => {
  const translations = {
    confirmed: "Order Received",
    design: "Design Phase",
    manufacturing: "Box Manufacturing Phase",
    printing: "Printing Phase",
    packing: "Packing Phase",
    shipped: "Ready for Shipping",
  };

  return `<div style="font-family: Arial, sans-serif; margin: 0">
  <div
    style="
      background-color: #123d47;
      padding: 20px;
      border-radius: 8px 8px 0 0;
      display: flex;
      align-items: center;
    "
  >
    <img
      src="https://api.etabema.com/images/logo.png"
      alt="Etabema Logo"
      style="height: 40px; width: auto; display: block; margin-right: auto"
    />
  </div>
  <div
    style="
      max-width: 480px;
      background: #fff;
      border-radius: 8px;
      padding: 32px;
      text-align: left;
    "
  >
    <h2 style="color: #123d47; margin-bottom: 16px">Order Update</h2>
    <p style="font-size: 16px; color: #333; margin-bottom: 24px">
      Thank you for shopping with Etabema Cosméticos Here is your order update:
    </p>
    <div style="border-radius: 6px; margin-bottom: 24px">
      <p style="margin: 20px 0; color: #123d47; font-weight: bold">
        Order Code: <span>${orderCode}</span>
      </p>
      <p style="margin: 0; color: #123d47; font-weight: bold">
        Status: <span>${translations[orderStatus]}</span>
      </p>
    </div>
    <a
      href="https://etabema.com/tracking.html"
      target="_blank"
      style="
        display: inline-block;
        background: #123d47;
        color: #fff;
        text-decoration: none;
        padding: 12px 28px;
        border-radius: 5px;
        font-size: 16px;
      "
    >
      Track Your Order
    </a>
  </div>
  <div style="background: #f4a4a1; padding: 10px; margin-top: 16px">
    <span style="color: #123d47; font-size: 13px"
      >&copy; Etabema Cosméticos. All rights reserved.</span
    >
  </div>
</div>

`;
};

export default orderEmailTemplate;
