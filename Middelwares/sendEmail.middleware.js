import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.USERPASS,
  },
});

export const SendUserEmail = async (email, name, msg) => {
  const mail_option = {
    from: email,
    to: process.env.EMAIL,
    subject: name,
    html: `
    
        <!DOCTYPE html>
        <html>

        <head>
            <style>
                /* Use inline styles as much as possible for email compatibility */
                body {
                    margin: 0;
                    padding: 0;
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                }

                .email-container {
                    max-width: 600px;
                    margin: 20px auto;
                    background: #ffffff;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    overflow: hidden;
                }

                .email-header {
                    background-color: #007BFF;
                    color: #ffffff;
                    text-align: center;
                    padding: 20px;
                }

                .email-body {
                    padding: 20px;
                    color: #333333;
                    line-height: 1.6;
                }

                .email-footer {
                    background-color: #f4f4f4;
                    color: #666666;
                    text-align: center;
                    padding: 10px;
                    font-size: 14px;
                }

                .button {
                    display: inline-block;
                    background-color: #007BFF;
                    color: #ffffff;
                    text-decoration: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    margin-top: 20px;
                }
                .order , .code{
                    font-size: 2.5rem ;
                    color: #007BFF;
                    text-transform: capitalize;
                    font-weight: 900 ;
                }
                .code{
                    font-size: 1.2rem;
                }
            </style>
        </head>

        <body>
            <div class="email-container">
                <div class="email-header">
                    <h1>Wellcome</h1>
                </div>
                <div class="email-body">
                    <p>Hello there ,</p>
                    <p>
                        ${msg}
                    </p>
                </div>
                <div class="email-footer">
                    <p>&copy; 2025 Your Company. All rights reserved.</p>
                </div>
            </div>
        </body>

</html>
    `,
    };

    try {
        const info = await transporter.sendMail(mail_option);
        console.log(`Email sent successfully to ${email}`);
    } catch (error) {
        console.log(`Fail To sent ${email}`, error);
    }
};
