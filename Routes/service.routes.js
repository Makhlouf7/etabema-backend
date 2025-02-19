import express from "express";
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
ServiceRoutes.route("/create-service").post(restrictTo("admin"), upload.single('imageSrc'),createService);
ServiceRoutes.route("/:id")
    .get(getServiceById)
    .delete(restrictTo("admin"), deleteServiceById)
    .patch(restrictTo("admin"), upload.single('imageSrc') , updateServiceById);

export default ServiceRoutes;