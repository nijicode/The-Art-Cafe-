import express from "express";
import {
  addOffers,
  getOffers,
  updateOffers,
} from "../controllers/offers.controller.js";
import multer from "multer";
import protectRoute from "../middleware/protectRoute.js";

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post("/add", protectRoute, upload.array("images"), addOffers);
router.get("/get", getOffers);
router.put("/update/:id", protectRoute, upload.array("images"), updateOffers);

export default router;
