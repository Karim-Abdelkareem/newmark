import express from "express";
import * as developerController from "../controllers/developerController.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

router
  .route("/")
  .post(upload.single('logo'),developerController.createDeveloper)
  .get(developerController.getDevelopers);

router
  .route("/:id")
  .get(developerController.getDeveloper)
  .patch(developerController.updateDeveloper)
  .delete(developerController.deleteDeveloper);

export default router;
