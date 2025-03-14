import express from "express";
import {
  createStatic,
  getAllStatic,
  getElementById,
  updateElement,
} from "../Controllers/static.controller.js";
import {
  authencatication,
  restrictTo,
} from "../Middelwares/auth.middelware.js";
import upload from "../Middelwares/uploadImage.js";

let staticRouter = express.Router();

staticRouter.route("/").get(getAllStatic);

staticRouter.use(authencatication);
staticRouter.route("/create-static").post(
  restrictTo("admin"),
  upload.fields([
    { name: "logoURL", maxCount: 1 },
    { name: "homeHeroURL", maxCount: 1 },
    { name: "servicesHeroURL", maxCount: 1 },
    { name: "categoriesHeroURL", maxCount: 1 },
    { name: "aboutHeroURL", maxCount: 1 },
  ]),
  createStatic
);
staticRouter.route("/:id").get(getElementById);
staticRouter.route("/:id").patch(
  restrictTo("admin"),
  upload.fields([
    { name: "logoURL", maxCount: 1 },
    { name: "homeHeroURL", maxCount: 1 },
    { name: "servicesHeroURL", maxCount: 1 },
    { name: "categoriesHeroURL", maxCount: 1 },
    { name: "aboutHeroURL", maxCount: 1 },
    { name: "postsHeroURL", maxCount: 1 },
  ]),
  updateElement
);

export default staticRouter;
