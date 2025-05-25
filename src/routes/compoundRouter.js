import express from "express";
import * as compoundController from "../controllers/compoundController.js";

const router = express.Router();

router
  .route("/")
  .get(compoundController.getCompounds)
  .post(compoundController.createCompound);

router
  .route("/:id")
  .get(compoundController.getCompound)
  .patch(compoundController.updateCompound)
  .delete(compoundController.deleteCompound);


export default router;