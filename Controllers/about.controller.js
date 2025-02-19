import Aboutus from "../Models/Aboutus.model.js";
import ApiError from "../Utils/ApiError.js";
import fs from 'fs'
import path from 'path'


import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Create AboutUs Controller
const createAboutus = async (req, res, next) => {
  let data = req.body;
  try {
    if (req.file) {
      data.imageSrc = `/uploads/${req.file.filename}`;
    }
    data.createdAt = new Date().toISOString();
    let newAbout = new Aboutus(data);
    await newAbout.save();
    res.status(201).json({ status: "Success", data: newAbout });
  } catch (error) {
    next(new ApiError(`Error From create about us`, 500));
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

// Delete AboutUs Controller
const deleteAboutById = async (req, res, next) => {
  let { id } = req.params;
  try {
    let deletedItem = await Aboutus.findByIdAndDelete(id);
    if (!deletedItem)
      return res.status(404).json({ status: "Fail", data: `No Data For This Id : ${id}` });
    
    if (deletedItem.imageSrc) {
      const imagePath =  deletedItem.imageSrc;
        fs.unlinkSync(`.${imagePath}`);
    }

    res.status(200).json({ status: "Success", data: deletedItem });
  } catch (error) {
    next(new ApiError(`Error From Delete Data`, 500));
  }
};

// Update AboutUs Controller
const updateAboutById = async (req, res, next) => {
  let newData = req.body;
  let { id } = req.params;

  try {
    let oldData = await Aboutus.findById(id);
    if (!oldData)
      return res.status(404).json({ status: "Fail", data: `No Data For This Id : ${id}` });
    
    if (req.file) {
      if (oldData.imageSrc) {
        const oldImagePath =  oldData.imageSrc;
        console.log(oldImagePath);
        fs.unlinkSync(`.${oldImagePath}`)
        
      }
      newData.imageSrc = `/uploads/${req.file.filename}`;
    }

    let updatedData = await Aboutus.findByIdAndUpdate(id, { ...newData }, { new: true });
    res.status(200).json({ status: "Success", data: updatedData });
  } catch (error) {
    next(new ApiError(`Error From Update Data ${error}`, 500));
  }
};

export {
  createAboutus,
  getAboutById,
  getAllAbout,
  deleteAboutById,
  updateAboutById,
};
