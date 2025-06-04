import Subscribe from "../Models/subscribers.model.js";
import catchAsync from "../Utils/catchAsync.js";
import sendEmail from "../Services/emailService.js";
import ApiError from "../Utils/ApiError.js";
import verifyEmailTemplate from "../Utils/emailTemplates/verifyEmail.js";
import emailVerifiedTemplate from "../Utils/emailTemplates/emailVerified.js";
import baseEmailTemplate from "../Utils/emailTemplates/baseEmail.js";
import emailUnsubscribedTemplate from "../Utils/emailTemplates/unsubscribed.js";

// Helper Functions =====

const sendVerificationEmail = async (req, emailToVerify, id) => {
  const URL = `${req.protocol}://${req.get("host")}/subscribe/verify?id=${id}`;
  const VERIFICATION_HTML = verifyEmailTemplate(URL);

  const msg = {
    subject: "Etabema - Verify Your Email",
    from: "no-reply@etabema.com",
    to: emailToVerify,
    html: VERIFICATION_HTML,
  };
  await sendEmail(msg);
};

const subscriberConfirmed = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  await Subscribe.findByIdAndUpdate(id, { verified: true });

  res
    .status(200)
    .set("Content-Type", "text/html")
    .send(`${emailVerifiedTemplate()}`);
});

// HTTP Functions =====
const addSubscriber = catchAsync(async (req, res, next) => {
  // if we did sent him an email before, we just return the existing subscriber else we create a new one
  const subscriber =
    (await Subscribe.findOne({ email: req.body.email })) ||
    (await Subscribe.create(req.body));

  sendVerificationEmail(req, subscriber.email, subscriber._id)
    .then(() => {
      res.status(202).json({
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
  const subscribers = await Subscribe.find({ verified: true });

  for (const sub of subscribers) {
    const unsubscribeLink = `${req.protocol}://${req.get(
      "host"
    )}/subscribe/unsubscribe?id=${sub.id}`;

    try {
      await sendEmail({
        subject,
        from: "no-reply@etabema.com",
        to: sub.email,
        html: baseEmailTemplate(message, unsubscribeLink),
      });
    } catch (e) {}

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  res.status(202).json({
    status: "success",
    data: null,
  });
});

const newsUnsubscribe = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  await Subscribe.findByIdAndDelete(id);

  res
    .status(200)
    .set("Content-Type", "text/html")
    .send(`${emailUnsubscribedTemplate()}`);
});

export {
  addSubscriber,
  getAllSubscribers,
  sendToAllSubscribers,
  subscriberConfirmed,
  newsUnsubscribe,
};
