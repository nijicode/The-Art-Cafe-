import Category from "../models/category.model.js";
import Item from "../models/item.model.js";
import { io } from "../socket/socket.js";
import { deleteFile, uploadImage } from "./file.controller.js";

export const addItem = async (req, res) => {
  try {
    const { id: categoryId } = req.params;
    const { productName, mPrice, lPrice, description } = req.body;
    const { buffer, originalname, mimetype } = req.file;
    const imageName = `${Date.now()}_${originalname}`;

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    if (!productName || !mPrice || !lPrice) {
      return res.status(404).json({ error: "Please fill in all the fields" });
    }

    const downloadURL = await uploadImage(buffer, imageName, mimetype);

    const newItem = new Item({
      productName,
      mPrice,
      lPrice,
      description,
      imageName,
      imageURL: downloadURL,
      category: categoryId,
    });

    if (newItem) {
      category.items.push(newItem._id);
    }

    await Promise.all([category.save(), newItem.save()]);
    io.emit("newItem", newItem);
    res
      .status(200)
      .json({ message: "Product saved successfully", product: newItem });
    console.log(` ${productName} is added in category: ${category.title}`);
  } catch (error) {
    console.log("Error in addItem controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const editItem = async (req, res) => {
  try {
    const { id: itemId } = req.params;
    const { productName, mPrice, lPrice, description } = req.body;

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    if (req.file) {
      const { buffer, originalname, mimetype } = req.file;
      const imageName = `${Date.now()}_${originalname}`;
      await deleteFile(`images/${item.imageName}`);
      const downloadURL = await uploadImage(buffer, imageName, mimetype);
      item.imageName = imageName;
      item.imageURL = downloadURL;
    }

    if (productName) item.productName = productName;
    if (mPrice) item.mPrice = mPrice;
    if (lPrice) item.lPrice = lPrice;
    if (description) item.description = description;

    await item.save();
    io.emit("updatedItem", item);
    res
      .status(200)
      .json({ message: "Product updated successfully", product: item });
  } catch (error) {
    console.log("Error in editItem controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id: itemId } = req.params;
    const item = await Item.findById(itemId);
    const category = await Category.findById(item.category);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    if (category) {
      category.items.pull(item._id);
    }
    if (item.imageName) {
      await deleteFile(`images/${item.imageName}`);
    }
    await category.save();
    await Item.findByIdAndDelete(itemId);

    io.emit("deleteItemId", itemId);

    res
      .status(200)
      .json({ message: "Product deleted successfully", category: category });
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
