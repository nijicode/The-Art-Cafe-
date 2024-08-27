import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  addItem,
  deleteItem,
  editItem,
  getItembyCategory,
  getItems,
  updateHearts,
} from "../controllers/item.controller.js";
import uploadRoute from "../middleware/uploadRoute.js";

const router = express.Router();

router.post("/add/category/:id", protectRoute, uploadRoute, addItem);
router.get("/get/category/:id", getItembyCategory);
router.put("/edit/:id", protectRoute, uploadRoute, editItem);
router.get("/all", getItems);
router.patch("/update/hearts/:id", updateHearts);
router.delete("/delete/:id", protectRoute, deleteItem);
export default router;
