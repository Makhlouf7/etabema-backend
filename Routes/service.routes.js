import express from "express";
import resizeImage from "../Utils/resizeImage.js";
import {
  createService,
  deleteServiceById,
  getAllServices,
  getServiceById,
  updateServiceById,
} from "../Controllers/service.controller.js";
import {
  authencatication,
  restrictTo,
} from "../Middelwares/auth.middelware.js";
import upload from "../Middelwares/uploadImage.js";
let ServiceRoutes = express.Router();

ServiceRoutes.route("/").get(getAllServices);

// Must Login First
ServiceRoutes.use(authencatication);
ServiceRoutes.route("/create-service").post(
  restrictTo("admin"),
  upload.single("imageSrc"),
  resizeImage({ width: 500, height: 500, quality: 75 }),
  createService
);
ServiceRoutes.route("/:id")
  .get(getServiceById)
  .delete(restrictTo("admin"), deleteServiceById)
  .patch(
    restrictTo("admin"),
    upload.single("imageSrc"),
    resizeImage({ width: 500, height: 500, quality: 75 }),
    updateServiceById
  );

export default ServiceRoutes;
