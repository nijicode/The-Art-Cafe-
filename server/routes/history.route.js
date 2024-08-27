import express from "express";
import {
  getHistory,
  updateMission,
  updateValues,
  updateVision,
} from "../controllers/history.controller.js";
import uploadHistoryRoute from "../middleware/uploadHistory.js";

const router = express.Router();

router.get("/history-details", getHistory);
router.put("/mission/update", uploadHistoryRoute, updateMission);
router.put("/vision/update", uploadHistoryRoute, updateVision);
router.put("/values/update", uploadHistoryRoute, updateValues);

export default router;
