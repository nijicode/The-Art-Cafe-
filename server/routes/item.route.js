import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  addItem,
  deleteItem,
  editItem,
  getItems,
  updateHearts,
} from "../controllers/item.controller.js";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post("/add/category/:id", protectRoute, upload.single("image"), addItem);
router.put("/edit/:id", protectRoute, upload.single("image"), editItem);
router.get("/all", getItems);
router.patch("/update/hearts/:id", updateHearts);
router.delete("/delete/:id", protectRoute, deleteItem);

export default router;
