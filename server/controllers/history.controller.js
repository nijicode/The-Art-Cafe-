import { io } from "../socket/socket.js";
import History from "../models/history.model.js";
import { deleteFile, uploadImage } from "./file.controller.js";

export const addHistory = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { buffer, originalname, mimetype } = req.file;
    const imageName = `${Date.now()}_${originalname}`;

    if (!title || !description) {
      return res.status(404).json({ error: "Please fill in all the fields" });
    }

    const downloadURL = await uploadImage(buffer, imageName, mimetype);

    const newHistory = new History({
      title,
      imageName,
      imageURL: downloadURL,
      description,
    });

    await newHistory.save();
    res
      .status(200)
      .json({ message: "History saved successfully", product: newHistory });
  } catch (error) {
    console.log("Error in addHistory controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateHistory = async (req, res) => {
  try {
    const { id: historyId } = req.params;
    const { description } = req.body;

    const history = await History.findById(historyId);
    if (!history) {
      return res.status(404).json({ error: "History not found" });
    }

    if (req.file) {
      const { buffer, originalname, mimetype } = req.file;
      const imageName = `${Date.now()}_${originalname}`;
      await deleteFile(`images/${history.imageName}`);
      const downloadURL = await uploadImage(buffer, imageName, mimetype);
      history.imageName = imageName;
      history.imageURL = downloadURL;
    }

    if (description) history.description = description;

    await history.save();
    io.emit("updatedHistory", history);
    res
      .status(200)
      .json({ message: "History updated successfully", history: history });
  } catch (error) {
    console.log("Error in updateHistory controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getHistory = async (req, res) => {
  try {
    let allHistory = await History.find();
    res.status(200).json(allHistory);
  } catch (error) {
    console.error("Error in getHistory", error.message);
    res.status(500).json({ error: "Error reading JSON files" });
  }
};
