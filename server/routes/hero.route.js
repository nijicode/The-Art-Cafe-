import express from "express";
import {
  addHero,
  getHero,
  updateHero,
} from "../controllers/hero.controller.js";
import multer from "multer";
import protectRoute from "../middleware/protectRoute.js";
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post("/add", protectRoute, upload.single("video"), addHero);
router.put("/update/:id", protectRoute, upload.single("video"), updateHero);
router.get("/get", getHero);
export default router;
