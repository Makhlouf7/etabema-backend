import express from "express";
import { getAllStats } from "../Controllers/stats.controller.js";
import { authencatication } from "../Middelwares/auth.middelware.js";
const router = express.Router();

if (process.env.NODE_ENV == "production") router.use(authencatication);

router.route("/").get(getAllStats);

export default router;
