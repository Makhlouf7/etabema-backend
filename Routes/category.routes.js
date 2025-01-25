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
const categoryRouter = express.Router();

categoryRouter.route("/").get(getAllCategories);
categoryRouter.route("/allProducts/:id").get(getAllProductInCategory);
categoryRouter.route("/:id").get(getCategoryById);

categoryRouter.use(authencatication);
categoryRouter
  .route("/create-category")
  .post(restrictTo("admin"), createCategory);
categoryRouter.route("/:id").delete(restrictTo("admin"), deleteCategory);
categoryRouter.route("/:id").patch(restrictTo("admin"), updateCategory);

export default categoryRouter;
