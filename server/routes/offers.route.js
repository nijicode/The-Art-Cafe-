import express from "express";
import {
  getOffersDetail,
  updateOffersDetail,
} from "../controllers/offers.controller.js";
import uploadOffersRoute from "../middleware/uploadOffersRoute.js";

const router = express.Router();

router.get("/offers-details", getOffersDetail);
router.put("/offers-details/update", uploadOffersRoute, updateOffersDetail);

export default router;
