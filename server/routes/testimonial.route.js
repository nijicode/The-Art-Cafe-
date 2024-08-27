import express from "express";
import {
  addTestimonial,
  deleteTestimonial,
  getTestimonials,
} from "../controllers/testimonial.controller.js";

const router = express.Router();

router.post("/add", addTestimonial);
router.get("/get", getTestimonials);
router.delete("/delete/:id", deleteTestimonial);

export default router;
