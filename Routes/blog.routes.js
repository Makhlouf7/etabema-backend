import express from "express";
import {
    createPost, getAllPosts, getPostById, updatePost, deletePost
} from "../Controllers/blog.controller.js";
import {
  authencatication,
} from "../Middelwares/auth.middelware.js";

let postRoutes = express.Router();

postRoutes.route("/").get(getAllPosts);
postRoutes.route("/:id").get(getPostById);

postRoutes.use(authencatication);
postRoutes
  .route("/create-post")
  .post(createPost);

  postRoutes
  .route("/:id")
  .delete(deletePost)
  .patch( updatePost);

export default postRoutes;
