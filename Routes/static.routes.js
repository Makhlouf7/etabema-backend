import express from "express";
import { createStatic, deleteElementById, getAllStatic, getElementById, updateElement } from "../Controllers/static.controller.js";
import {
    authencatication,
    restrictTo,
} from "../Middelwares/auth.middelware.js";

let staticRouter = express.Router();

staticRouter.route('/').get(getAllStatic)

staticRouter.use(authencatication);
staticRouter.route("/create-static").post(restrictTo("admin"), createStatic);
staticRouter.route('/:id').get(getElementById)
staticRouter.route('/:id').delete(restrictTo('admin') , deleteElementById)
staticRouter.route('/:id').patch(restrictTo('admin') , updateElement)

export default staticRouter;
