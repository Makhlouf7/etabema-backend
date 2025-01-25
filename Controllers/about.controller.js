import Aboutus from "../Models/Aboutus.model.js";
import ApiError from "../Utils/ApiError.js";

const createAboutus = async (req, res, next) => {
  let data = req.body;
  try {
    data.createdAt = new Date().toISOString();
    let newAbout = new Aboutus(data);
    await newAbout.save();
    res.status(201).json({ status: "Success", data: newAbout });
  } catch (error) {
    next(new ApiError(`Error From create about us`), 500);
  }
};

const getAllAbout = async (req, res, next) => {
  try {
    let data = await Aboutus.find();
    if (!data)
      return res
        .status(404)
        .json({ status: "Fail", data: `No Data In About Us Section` });

    res.status(200).json({ status: "Success", data: data });
  } catch (error) {
    next(new ApiError(`Error From Get All Data Of Aboutus`, 500));
  }
};

const getAboutById = async (req, res, next) => {
  let { id } = req.params;
  try {
    let data = await Aboutus.findById(id);
    if (!data)
      return res
        .status(404)
        .json({ status: "Fail", data: `No Data For This Id : ${id}` });

    res.status(200).json({ status: "Success", data: data });
  } catch (error) {
    next(new ApiError("Error From Get About By id ", 500));
  }
};

const deleteAboutById = async (req, res, next) => {
  let { id } = req.params;
  try {
    let deletedItem = await Aboutus.findByIdAndDelete(id);
    if (!deletedItem)
      return res
        .status(404)
        .json({ status: "Fail", data: `No Data For This Id : ${id}` });

    res.status(200).json({ status: "Success", data: deletedItem });
  } catch (error) {
    next(new ApiError(`Error From Delete Data`, 500));
  }
};

const updateAboutById = async (req, res, next) => {
  let newData = req.body;
  let { id } = req.params;

  try {
    let oldData = await Aboutus.findById(id);
    if (!oldData)
      return res
        .status(404)
        .json({ status: "Fail", data: `No Data For This Id : ${id}` });

    let data = await Aboutus.findByIdAndUpdate(
      id,
      { ...newData },
      { new: true }
    );
    res.status(200).json({ status: "Success", data: data });
  } catch (error) {
    next(new ApiError(`Error From Update Data`, 500));
  }
};
export {
  createAboutus,
  getAboutById,
  getAllAbout,
  deleteAboutById,
  updateAboutById,
};
