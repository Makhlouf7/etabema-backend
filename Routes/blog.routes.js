import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../Controllers/blog.controller.js";
import upload from "../Middelwares/uploadImage.js";
import resizeImage from "../Utils/resizeImage.js";
import { authencatication } from "../Middelwares/auth.middelware.js";

let postRoutes = express.Router();

postRoutes.route("/").get(getAllPosts);
postRoutes.route("/:id").get(getPostById);
// Don't use authentication in development
if (process.env.NODE_ENV == "production") postRoutes.use(authencatication);

postRoutes
  .route("/create-post")
  .post(
    upload.single("media"),
    resizeImage({ width: 500, height: 500, quality: 75 }),
    createPost
  );

postRoutes
  .route("/:id")
  .delete(deletePost)
  .patch(
    upload.single("media"),
    resizeImage({ width: 500, height: 500, quality: 75 }),
    updatePost
  );

export default postRoutes;
