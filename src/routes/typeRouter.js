import express from "express";
import * as typeController from "../controllers/typeController.js";

const router = express.Router();

router.route("/").post(typeController.createType).get(typeController.getTypes);

router
  .route("/:id")
  .get(typeController.getTypeById)
  .patch(typeController.updateType)
  .delete(typeController.deleteType);

export default router;
