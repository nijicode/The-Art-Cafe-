import express from "express";
import uploadVidRoute from "../middleware/uploadVidRoute.js";
import {
  getHeroDetails,
  updateHeroDetails,
} from "../controllers/hero.controller.js";

const router = express.Router();

router.get("/hero-details", getHeroDetails);
router.put("/hero-details/update", uploadVidRoute, updateHeroDetails);

export default router;
