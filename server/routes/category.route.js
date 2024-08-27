import express from "express";
import {
  addCategory,
  deleteCategory,
  getCategories,
} from "../controllers/category.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/add", protectRoute, addCategory);
router.get("/get", getCategories);
router.delete("/delete/:id", protectRoute, deleteCategory);

export default router;
