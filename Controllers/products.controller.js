import Category from "../Models/Category.model.js";
import Products from "../Models/Products.model.js";
import ApiError from "../Utils/ApiError.js";
import catchAsync from "../Utils/catchAsync.js";
import { ValidationError } from "../Utils/ValidationError.js";
import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//
const craeteProduct = async (req, res, next) => {
  try {
    let product = req.body;
    let categoryTitle = product.categoryName?.trim();

    const existProduct = await Products.findOne({ titleEn: product.titleEn });
    if (existProduct) {
      return res
        .status(400)
        .json({ status: "Fail", data: "This product is already exixt" });
    }

    let compareCategory = await Category.findOne({ titleEn: categoryTitle });
    if (!compareCategory) {
      return res
        .status(404)
        .json({ status: "Fail", data: "No category like this name" });
    }

    if (!req.file) {
      return res.status(400).json({ status: "Fail", data: "Image required" });
    }
    product.productImage = `/uploads/${req.file.filename}`;

    product.category = compareCategory._id;

    let newProduct = new Products(product);
    await newProduct.save();

    res.status(201).json({ status: "Success", data: newProduct });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ status: "Fail", data: error.message });
    }
    next(new ApiError("Error in create product", 500));
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    let products = await Products.find().populate("category");
    if (!products)
      return res
        .status(404)
        .json({ status: "Fail", data: "No Products Available" });

    res.status(200).json({ status: "Success", data: products });
  } catch (error) {
    console.log(error);

    next(new ApiError("Error From Get All Products", 500));
  }
};

const getProductById = async (req, res, next) => {
  let { id } = req.params;
  try {
    let product = await Products.findById(id).populate("category");
    if (!product)
      return res
        .status(404)
        .json({ status: "Fail", data: `No Product With This ID : ${id}` });

    res.status(200).json({ status: "Success", data: product });
  } catch (error) {
    next(new ApiError("Error From Get Product By Id", 500));
  }
};

const deleteProductById = async (req, res, next) => {
  let { id } = req.params;

  try {
    let product = await Products.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ status: "Fail", data: `No Product With This ID : ${id}` });
    }

    if (product.productImage) {
      const imagePath = path.join(process.cwd(), product.productImage);
      console.log(`Deleting image at: ${imagePath}`);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log("Image deleted successfully");
      } else {
        console.log("Image not found, skipping deletion");
      }
    }

    await Products.findByIdAndDelete(id);

    res.status(200).json({ status: "Success", data: product });
  } catch (error) {
    next(new ApiError("Error From Delete Product", 500));
  }
};

const updateProductById = catchAsync(async (req, res, next) => {
  let newProduct = req.body;
  let { id } = req.params;
  let categoryTitle = newProduct.categoryName?.trim();

  let oldProduct = await Products.findById(id);
  if (!oldProduct) return next(new ApiError("No such product", 404));

  if (req.file) {
    if (oldProduct.productImage) {
      const oldImagePath = path.join(process.cwd(), oldProduct.productImage);
      console.log(`Deleting old image at: ${oldImagePath}`);

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
        console.log("Old image deleted successfully");
      } else {
        console.log("Old image not found, skipping deletion");
      }
    }

    newProduct.productImage = `/uploads/${req.file.filename}`;
  }

  const existCategory = await Category.findOne({ titleEn: categoryTitle });
  if (!existCategory) return next(new ApiError("No such category", 404));
  newProduct.category = existCategory._id;

  let updatedProduct = await Products.findByIdAndUpdate(
    id,
    { ...newProduct },
    { new: true }
  );

  res.status(200).json({ status: "Success", data: updatedProduct });
});

export {
  craeteProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById,
};
