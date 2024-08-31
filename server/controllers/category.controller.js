import Category from "../models/category.model.js";
import Item from "../models/item.model.js";
import { io } from "../socket/socket.js";
import { deleteFile } from "./file.controller.js";

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

    for (const item of items) {
      try {
        if (item.imageName) {
          await deleteFile(`images/${item.imageName}`);
        }
        await Item.deleteOne({ _id: item._id });
      } catch (error) {
        console.error(
          "An error occurred during the item processing",
          error.message
        );
      }
    }

    // Now delete the category
    await Category.deleteOne({ _id: categoryId });
    io.emit("deleteCategoryId", categoryId);
    res
      .status(200)
      .json({ message: "Category and associated items deleted successfully" });
    console.log(`${category.title} category was deleted`);
  } catch (error) {
    console.log("Error in deleteCategory controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
