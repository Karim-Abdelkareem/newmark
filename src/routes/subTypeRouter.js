import express from "express";
import * as subTypeController from "../controllers/subTypeController.js";

const router = express.Router();
router
  .route("/")
  .post(subTypeController.createSubType)
  .get(subTypeController.getSubTypes);

router
  .route("/:id")
  .get(subTypeController.getSubTypeById)
  .patch(subTypeController.updateSubType)
  .delete(subTypeController.deleteSubType);

router.route("/type/:typeId").get(subTypeController.getSubTypesByType);
export default router;
