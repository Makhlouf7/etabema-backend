import modelMap from "../Utils/modelsMapping.js";
import catchAsync from "../Utils/catchAsync.js";
import ApiError from "../Utils/ApiError.js";

const reorderItems = catchAsync(async (req, res, next) => {
  const allowedKeys = Object.keys(modelMap),
    { modelName } = req.params;

  if (!allowedKeys.includes(modelName))
    return next(new ApiError("Incorrect arguments", 400));

  const Model = modelMap[modelName],
    { orders } = req.body;

  await Promise.all(
    orders.map((item) =>
      Model.findByIdAndUpdate(item.id, { $set: { position: item.position } })
    )
  );

  res.status(200).json({
    status: "success",
  });
});

export default reorderItems;
