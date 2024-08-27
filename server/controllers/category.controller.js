import Category from "../models/category.model.js";
import Item from "../models/item.model.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { io } from "../socket/socket.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const addCategory = async (req, res) => {
  try {
    const { title } = req.body;
    let existingCategory = await Category.findOne({ title: title });
    if (existingCategory) {
      return res.status(409).json({ message: "Category already exists" });
    }
    let newCategory = new Category({ title: title });
    await newCategory.save();

    io.emit("newCategory", newCategory);
    res.status(201).json(newCategory);
  } catch (error) {
    console.log("Error in addCategory controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getCategories = async (req, res) => {
  try {
    let allCategories = await Category.find();
    res.status(200).json(allCategories);
  } catch (error) {
    console.log("Error in getCategories controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id: categoryId } = req.params;

    // Find the category by ID
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Find all items associated with this category
    const items = await Item.find({ category: categoryId });

    // Loop through each item and delete it
    for (const item of items) {
      // Unlink the image if it exists
      if (item.image) {
        const imagePath = path.join(
          __dirname,
          "..",
          "..",
          "uploads",
          item.image
        );
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error(`Failed to delete image ${item.image}:`, err);
          } else {
            console.log(`Successfully deleted image ${item.image}`);
          }
        });
      }

      // Delete the item
      await Item.deleteOne({ _id: item._id });
    }

    // Now delete the category
    await Category.deleteOne({ _id: categoryId });
    io.emit("deleteCategoryId", categoryId);
    res
      .status(200)
      .json({ message: "Category and associated items deleted successfully" });
  } catch (error) {
    console.log("Error in deleteCategory controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
