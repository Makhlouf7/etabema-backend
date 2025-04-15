import express from "express";
import reorderItems from "../Controllers/reorder.controller.js";
const Router = express.Router();

Router.patch("/:modelName", reorderItems);

export default Router;
