import fs from "fs";
import path from "path";
import Category from "../models/category.model.js";
import Item from "../models/item.model.js";
import { fileURLToPath } from "url";
import { io } from "../socket/socket.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const addItem = async (req, res) => {
  try {
    const { id: categoryId } = req.params;
    const { productName, mPrice, lPrice, description } = req.body;
    const image_filename = req.file.filename;

    const category = await Category.findById(categoryId);
    if (!productName || !mPrice || !lPrice) {
      return res.status(404).json({ error: "Please fill in all the fields" });
    }
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const newItem = new Item({
      productName,
      mPrice,
      lPrice,
      description,
      image: image_filename,
      category: categoryId,
    });

    if (newItem) {
      category.items.push(newItem._id);
    }

    await Promise.all([category.save(), newItem.save()]);

    io.emit("newItem", newItem);
    res.status(201).json({ newItem, category });
  } catch (error) {
    console.log("Error in addItem controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getItembyCategory = async (req, res) => {
  try {
    const { id: categoryId } = req.params;
    const category = await Category.findById(categoryId).populate("items");
    const items = category.items;
    res.status(200).json(items);
  } catch (error) {
    console.log("Error in getItembyCategory controller");
    res.status(500).json({ error: "internal server error" });
  }
};

export const editItem = async (req, res) => {
  try {
    const { id: itemId } = req.params;
    const { productName, mPrice, lPrice, description } = req.body;
    const newImage = req.file ? req.file.filename : null;

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    if (newImage) {
      // Delete the existing image file
      const oldImagePath = path.join(
        __dirname,
        "..",
        "..",
        "uploads",
        item.image
      ); // Adjust the path based on your folder structure
      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.log("Error deleting the old image file", err.message);
        }
      });

      // Update the item's image to the new image
      item.image = newImage;
    }

    // Update other item details
    if (productName) item.productName = productName;
    if (mPrice) item.mPrice = mPrice;
    if (lPrice) item.lPrice = lPrice;
    if (description) item.description = description;

    await item.save();
    io.emit("updatedItem", item);
    res.status(200).json({ item });
  } catch (error) {
    console.log("Error in editItem controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id: itemId } = req.params;
    const item = await Item.findById(itemId);

    io.emit("deleteItemId", itemId);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Remove the item's reference from the category's items array
    const category = await Category.findById(item.category);
    if (category) {
      category.items.pull(item._id);
      await category.save();
    }

    // Delete the image file associated with the item
    const imagePath = path.join(__dirname, "..", "..", "uploads", item.image); // Adjust the path based on your folder structure
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.log("Error deleting the image file", err.message);
      }
    });

    // Delete the item from the database
    await Item.findByIdAndDelete(itemId);

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.log("Error in deleteItem controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const updateHearts = async (req, res) => {
  try {
    const { id: itemId } = req.params;
    const { hearts } = req.body;

    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    item.hearts = hearts;
    await item.save();

    io.emit("updatedHearts", item);
    res.status(200).json({ item });
  } catch (error) {
    console.log("Error in updateHearts controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getItems = async (req, res) => {
  try {
    let allItems = await Item.find();
    res.status(200).json(allItems);
  } catch (error) {
    console.log("Error in getItems controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
