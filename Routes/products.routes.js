import express from "express";
import resizeImage from "../Utils/resizeImage.js";
import {
  craeteProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from "../Controllers/products.controller.js";
import {
  authencatication,
  restrictTo,
} from "../Middelwares/auth.middelware.js";
import upload from "../Middelwares/uploadImage.js";

const productRouter = express.Router();

productRouter.route("/").get(getAllProducts);
productRouter.route("/:id").get(getProductById);

productRouter.use(authencatication);
productRouter
  .route("/create-product")
  .post(
    restrictTo("admin"),
    upload.single("productImage"),
    resizeImage({ width: 500, height: 500, quality: 75 }),
    craeteProduct
  );
productRouter.route("/:id").delete(restrictTo("admin"), deleteProductById);
productRouter
  .route("/:id")
  .patch(
    restrictTo("admin"),
    upload.single("productImage"),
    resizeImage({ width: 500, height: 500, quality: 75 }),
    updateProductById
  );

export default productRouter;
