import Order from "../Models/Order.model.js";
import ApiError from "../Utils/ApiError.js";
import sendEmail from "../Services/emailService.js";
import orderEmailTemplate from "../Utils/emailTemplates/orderEmail.js";

function generateTrackingCode() {
  const timestamp = Date.now().toString();
  const random = Math.floor(10000000 + Math.random() * 90000000).toString();
  return `${random}-${timestamp}`;
}
const createOrder = async (req, res, next) => {
  try {
    const newOrder = await Order.create({
      ...req.body,
      orderID: generateTrackingCode(),
    });

    const msg = {
      to: newOrder.email,
      from: `no-reply@etabema.com`,
      subject: `Track Your Order – Etabema Cosméticos`,
      html: orderEmailTemplate(newOrder.orderID, newOrder.status),
    };

    await sendEmail(msg);
    res.status(201).json({ status: "success", data: newOrder });
  } catch (error) {
    console.log(error);
    next(new ApiError(`Error Form Create Order `, 500));
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    let allOrders = await Order.aggregate([
      {
        $project: {
          _id: 0,
        },
      },
      {
        $addFields: {
          _id: "$orderID",
        },
      },
      {
        $project: {
          orderID: 0,
        },
      },
    ]);
    if (!allOrders)
      return res
        .status(404)
        .json({ status: "Fail", data: `No Orders Created Yet !` });

    res.status(200).json({ status: "success", data: allOrders });
  } catch (error) {
    next(new ApiError(`Error From Get ALl Orders `, 500));
  }
};

const getOrderById = async (req, res, next) => {
  let { id } = req.params;
  try {
    let order = await Order.findOne({ orderID: id });
    if (!order)
      return res
        .status(404)
        .json({ status: "Fail", data: `No Order With This ID ${id}` });

    res.status(200).json({ status: "success", data: order });
  } catch (error) {
    next(new ApiError(`Error From Get Order By ID`, 500));
  }
};

const deleteOrder = async (req, res) => {
  let { id } = req.params;
  try {
    let item = await Order.findOneAndDelete({ orderID: id });
    if (!item)
      return res
        .status(404)
        .json({ status: "Fail", data: `No Data With This ${id} ID` });

    res.status(200).json({ status: "Success", data: item });
  } catch (error) {
    next(new ApiError(`Error From Delete By ID In Static`), 500);
  }
};

const updateOrder = async (req, res, next) => {
  let newData = req.body;
  let { id } = req.params;

  try {
    let oldData = await Order.findOne({ orderID: id });
    if (!oldData)
      return res
        .status(404)
        .json({ status: "Fail", data: `No Data For This Id : ${id}` });

    let data = await Order.findOneAndUpdate(
      { orderID: id },
      { ...newData },
      { new: true }
    );

    const msg = {
      to: data.email,
      from: `no-reply@etabema.com`,
      subject: `Track Your Order – Etabema Cosméticos`,
      html: orderEmailTemplate(data.orderID, data.status),
    };

    await sendEmail(msg);
    res.status(201).json({ status: "success", data });
  } catch (error) {
    console.log(error);

    next(new ApiError(`Error From Update Data`, 500));
  }
};
export { createOrder, getAllOrders, getOrderById, deleteOrder, updateOrder };
