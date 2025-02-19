import Category from "../Models/Category.model.js";
import Products from "../Models/Products.model.js";
import ApiError from "../Utils/ApiError.js";
import { ValidationError } from "../Utils/ValidationError.js";

import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const createCategory = async (req, res, next) => {
//     try {
//         let category = req.body;
//         // console.log(category);

//         // Must Unique
//         const existCategory = await Category.findOne({
//             titleEn: category.titleEn,
//         });
//         if (existCategory) {
//             return res
//                 .status(400)
//                 .json({ status: "Fail", data: "This Category is already exists" });
//         }
//         if (req.file) {
//             category.imageSrc = `/uploads/${req.file.filename}`;
//         }
//             category.createdAt = new Date().toISOString();
//             category.userId = req.id
//             let newCategory = new Category(category);
//             await newCategory.save();
//             res.status(201).json({ status: "Success", data: newCategory });
//     } catch (error) {
//     // Handle Validation error
//         if (error.name === "ValidationError") {
//             ValidationError(error, res);
//         }
//         console.log(error);

//         next(new ApiError(`Error From Create Category`, 500));
//     }
// };
const createCategory = async (req, res, next) => {
  try {
    let {
      titleEn,
      titleAr,
      titleBr,
      seoEn,
      seoAr,
      seoBr,
      descriptionEn,
      descriptionAr,
      descriptionBr,
      btnTextEn,
      btnTextAr,
      btnTextBr,
    } = req.body;

    if (!titleEn || !titleAr || !titleBr) {
      return res.status(400).json({
        status: "Fail",
        data: "Title in Arabic and English and Brazil its required",
      });
    }

    const existCategory = await Category.findOne({ titleEn });
    if (existCategory) {
      return res
        .status(400)
        .json({ status: "Fail", data: "This category its alredy exixt" });
    }

    if (!req.id) {
      return res
        .status(401)
        .json({ status: "Fail", data: "User Id its required" });
    }

    const newCategory = new Category({
      userId: req.id,
      titleEn,
      titleAr,
      titleBr,
      seoEn,
      seoAr,
      seoBr,
      descriptionEn,
      descriptionAr,
      descriptionBr,
      btnTextEn,
      btnTextAr,
      btnTextBr,
      imageSrc: req.file
        ? `/uploads/${req.file.filename}`
        : "/uploads/default.png",
      createdAt: new Date().toISOString(),
    });

    await newCategory.save();

    res.status(201).json({ status: "Success", data: newCategory });
  } catch (error) {
    if (error.name === "ValidationError") {
      return ValidationError(error, res);
    }

    console.error("Error in create category ", error);
    return next(new ApiError("Error in create category", 500));
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    let categories = await Category.find();
    if (!categories)
      return res
        .status(404)
        .json({ status: "Fail", data: "No Categories Found" });

    res.status(200).json({ status: "Success", data: categories });
  } catch (error) {
    next(new ApiError(`Error From Get All Categories`, 500));
  }
};

const getCategoryById = async (req, res, next) => {
  let { id } = req.params;
  try {
    let category = await Category.findById(id);
    if (!category)
      return res
        .status(404)
        .json({ status: "Fail", data: `No Category with this Id : ${id}` });

    res.status(200).json({ status: "Success", data: category });
  } catch (error) {
    next(new ApiError(`Error From Get Category By Id`, 500));
  }
};

const getAllProductInCategory = async (req, res, next) => {
  let { id } = req.params;
  try {
    let category = await Category.findById(id);
    if (!category)
      return res
        .status(404)
        .json({ status: "Fail", data: `No Category With This Id : ${id}` });

    let ProductsInCategory = await Products.find({ category: id });
    if (!ProductsInCategory)
      return res.status(404).json({
        status: "Fail",
        ProductsInCategory: `No Products In This Category !`,
      });

    res
      .status(200)
      .json({ status: "success", ProductsInCategory: ProductsInCategory });
  } catch (error) {
    next(new ApiError(`Error From Get All Products In Category`));
  }
};

//

const deleteCategory = async (req, res, next) => {
  let { id } = req.params;
  try {
    let category = await Category.findById(id);
    if (!category) {
      return res
        .status(404)
        .json({ status: "Fail", data: `No Category with this Id: ${id} ` });
    }

    if (category.imageSrc) {
      const imagePath = path.join(process.cwd(), category.imageSrc);
      console.log(`Trying to delete category image: ${imagePath}`);

      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Error deleting category image:", err);
          } else {
            console.log("Category image deleted successfully");
          }
        });
      } else {
        console.log("Category image not found, skipping deletion");
      }
    }

    let products = await Products.find({ category: id });
    if (products.length > 0) {
      for (let product of products) {
        if (product.productImage) {
          const productImagePath = path.join(
            process.cwd(),
            product.productImage
          );
          console.log(`Trying to delete product image: ${productImagePath}`);

          if (fs.existsSync(productImagePath)) {
            fs.unlinkSync(productImagePath);
            console.log("Product image deleted successfully");
          } else {
            console.log("Product image not found, skipping deletion");
          }
        }
      }
    }

    await Products.deleteMany({ category: id });

    await Category.findByIdAndDelete(id);

    res
      .status(200)
      .json({
        status: "Success",
        data: `Category with ID ${id} and related products deleted successfully`,
      });
  } catch (error) {
    next(new ApiError(`Error From Delete Category: ${error.message}`, 500));
  }
};

const updateCategory = async (req, res, next) => {
  let category = req.body;
  let { id } = req.params;

  try {
    let oldCategory = await Category.findById(id);
    if (!oldCategory)
      return res
        .status(404)
        .json({ status: "Fail", data: `No Category with this Id: ${id}` });

    if (req.file) {
      if (oldCategory.imageSrc) {
        const oldImagePath = path.join(process.cwd(), oldCategory.imageSrc);
        console.log(`Deleting old image: ${oldImagePath}`);

        if (fs.existsSync(oldImagePath)) {
          fs.unlink(oldImagePath, (err) => {
            if (err) console.error("Error deleting file:", err);
            else console.log("Old file deleted successfully");
          });
        } else {
          console.log("Old file not found, skipping deletion");
        }
      }
      category.imageSrc = `/uploads/${req.file.filename}`;
    }

    let newCategory = await Category.findByIdAndUpdate(id, category, {
      new: true,
    });

    res.status(200).json({ status: "Success", data: newCategory });
  } catch (error) {
    next(new ApiError(`Error From Update Category: ${error.message}`, 500));
  }
};

export {
  createCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
  updateCategory,
  getAllProductInCategory,
};
