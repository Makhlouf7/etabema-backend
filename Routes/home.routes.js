import express from "express";
import {
    createHome,
    deleteHomeItem,
    getAllHomeData,
    getHomeItem,
    updateHomeItem,
} from "../Controllers/home.controller.js";
import {
    authencatication,
    restrictTo,
} from "../Middelwares/auth.middelware.js";

let homeRouter = express.Router();

homeRouter.route("/").get(getAllHomeData);
// Must Login First
homeRouter.use(authencatication);
homeRouter.route("/create-hom").post(restrictTo("admin"), createHome);
homeRouter
    .route("/:id")
    .get(getHomeItem)
    .delete(restrictTo("admin"), deleteHomeItem)
    .patch(restrictTo("admin"), updateHomeItem);

export default homeRouter;
