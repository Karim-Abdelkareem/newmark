import express from "express";
import * as propertyController from "../controllers/propertyController.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

router
  .route("/")
  .get(propertyController.getApprovedPropreties)
  .post(
    upload.fields([
      { name: "images", maxCount: 5 },
      { name: "videos", maxCount: 5 },
      { name: "master", maxCount: 1 },
    ]),
    propertyController.createProperty
  );

router
  .route("/:id")
  .get(propertyController.getPropretyById)
  .patch(propertyController.updateProprety)
  .delete(propertyController.deleteProperty);

router.get("/properties/all", propertyController.getPropreties);
router.get(
  "/properties/non-approved",
  propertyController.getNonApprovedPropreties
);
router.patch("/change-approve/:id", propertyController.changeApproveProprety);

export default router;
