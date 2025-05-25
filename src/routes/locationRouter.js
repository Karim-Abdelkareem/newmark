import express from "express";
import * as locationController from "../controllers/locationController.js";

const router = express.Router();

router
  .route("/")
  .post(locationController.createLocation)
  .get(locationController.getLocations);

router
  .route("/:id")
  .get(locationController.getLocation)
  .patch(locationController.updateLocation)
  .delete(locationController.deleteLocation);

export default router;