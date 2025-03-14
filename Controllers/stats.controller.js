import Subscribe from "../Models/subscribers.model.js";
import Order from "../Models/Order.model.js";
import catchAsync from "../Utils/catchAsync.js";

const getAllStats = catchAsync(async (req, res, next) => {
  const ordersCount = await Order.countDocuments();
  const subscribeCount = await Subscribe.countDocuments();

  res.status(200).json({
    status: "success",
    data: [
      {
        name: "Orders",
        results: ordersCount,
      },
      {
        name: "Subscribers",
        results: subscribeCount,
      },
    ],
  });
});

export { getAllStats };
