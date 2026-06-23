import express from "express";
import multer from "multer";
import { identifyPlant } from "../controllers/plant.controller.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/identify", upload.single("image"), identifyPlant);

export default router;