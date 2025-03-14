import Subscribe from "../Models/subscribers.model.js";
import catchAsync from "../Utils/catchAsync.js";
import sendEmail from "../Services/emailService.js";
import ApiError from "../Utils/ApiError.js";

// Helper Functions =====

const sendVerificationEmail = async (emailToVerify, id) => {
  const VERIFICATION_HTML = `<h1> Thank you for signing up for Etabema newsletter!
      <p>Please click on the link below to verify your email</p>
      <a href="${process.env.SERVER_URL}/subscribe/verify?id=${id}">Verify your email</a>`;

  return sendEmail(
    emailToVerify,
    "Etabema - Verify Your Email",
    VERIFICATION_HTML
  );
};

const subscriberConfirmed = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  await Subscribe.findByIdAndUpdate(id, { verified: true });

  res
    .status(200)
    .set("Content-Type", "text/html")
    .send(`<h1>Email Successfully Verified</h1>`);
});

const sendBulkEmails = async (subject, body) => {
  // console.log("Sending to all subscribers");
  const allSubscribers = await Subscribe.find({ verified: true });

  for (const subscriber of allSubscribers) {
    const bodyWithUnsubscribe = `<a href="${process.env.SERVER_URL}/subscribe/unsubscribe?id=${subscriber.id}">Unsubscribe</a> <p>${body}</p>`;

    try {
      await sendEmail(subscriber.email, subject, bodyWithUnsubscribe);
      // console.log(`Email sent to ${subscriber.email}`);
    } catch (error) {
      // console.error(`Failed to send email to ${subscriber.email}:`, error);
    }

    // Rate limiting: wait for 2 second between sending emails
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  // console.log("Sent to all subscribers");
};

// HTTP Functions =====
const addSubscriber = catchAsync(async (req, res, next) => {
  const subscriber = await Subscribe.create(req.body);
  sendVerificationEmail(subscriber.email, subscriber._id)
    .then(() => {
      res.status(201).json({
        status: "success",
        data: subscriber,
      });
    })
    .catch(async (err) => {
      await Subscribe.findByIdAndDelete(subscriber._id);
      return next(new ApiError("Email is not valid 💥", 400));
    });
});

const getAllSubscribers = catchAsync(async (req, res, next) => {
  const allSubscribers = await Subscribe.find({ verified: true });

  res.status(200).json({
    status: "success",
    results: allSubscribers.length,
    data: null,
  });
});

const sendToAllSubscribers = catchAsync(async (req, res, next) => {
  const { subject, message } = req.body;
  sendBulkEmails(subject, message);
  console.log(message);
  res.status(202).json({
    status: "success",
    message: "Email is being sent to all subscribers",
    data: null,
  });
});

const newsUnsubscribe = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  await Subscribe.findByIdAndDelete(id);

  res
    .status(200)
    .set("Content-Type", "text/html")
    .send(`<h1>You have successfully unsubscribed from our newsletter</h1>`);
});

export {
  addSubscriber,
  getAllSubscribers,
  sendToAllSubscribers,
  subscriberConfirmed,
  newsUnsubscribe,
};
