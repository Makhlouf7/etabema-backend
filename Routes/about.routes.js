import express from "express";
import resizeImage from "../Utils/resizeImage.js";
import {
  createAboutus,
  deleteAboutById,
  getAboutById,
  getAllAbout,
  updateAboutById,
} from "../Controllers/about.controller.js";
import {
  authencatication,
  restrictTo,
} from "../Middelwares/auth.middelware.js";
import upload from "../Middelwares/uploadImage.js";
const aboutRouter = express.Router();

aboutRouter
  .route("/create-about")
  .post(
    authencatication,
    restrictTo("admin"),
    upload.single("imageSrc"),
    resizeImage({ width: 500, height: 500, quality: 75 }),
    createAboutus
  );
aboutRouter.route("/").get(getAllAbout);

aboutRouter
  .route("/:id")
  .get(getAboutById)
  .delete(authencatication, restrictTo("admin"), deleteAboutById)
  .patch(
    authencatication,
    restrictTo("admin"),
    upload.single("imageSrc"),
    resizeImage({ width: 500, height: 500, quality: 75 }),
    updateAboutById
  );
export default aboutRouter;
