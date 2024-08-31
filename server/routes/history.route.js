import express from "express";
import {
  addHistory,
  getHistory,
  updateHistory,
} from "../controllers/history.controller.js";
import protectRoute from "../middleware/protectRoute.js";

import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post("/add", protectRoute, upload.single("image"), addHistory);
router.put("/update/:id", protectRoute, upload.single("image"), updateHistory);
router.get("/get", getHistory);

export default router;
