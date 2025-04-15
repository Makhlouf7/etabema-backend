import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getAllProductInCategory,
  getCategoryById,
  updateCategory,
} from "../Controllers/category.controller.js";
import {
  authencatication,
  restrictTo,
} from "../Middelwares/auth.middelware.js";
import upload from "../Middelwares/uploadImage.js";
import resizeImage from "../Utils/resizeImage.js";
const categoryRouter = express.Router();

categoryRouter.route("/").get(getAllCategories);
categoryRouter.route("/allProducts/:id").get(getAllProductInCategory);
categoryRouter.route("/:id").get(getCategoryById);

categoryRouter.use(authencatication);
categoryRouter
  .route("/create-category")
  .post(
    restrictTo("admin"),
    upload.single("imageSrc"),
    resizeImage({ width: 500, height: 500, quality: 75 }),
    createCategory
  );
categoryRouter.route("/:id").delete(restrictTo("admin"), deleteCategory);
categoryRouter
  .route("/:id")
  .patch(
    restrictTo("admin"),
    upload.single("imageSrc"),
    resizeImage({ width: 500, height: 500, quality: 75 }),
    updateCategory
  );

export default categoryRouter;
