import { io } from "../socket/socket.js";
import { deleteFile, uploadImage } from "./file.controller.js";
import Offers from "../models/offers.model.js";

export const addOffers = async (req, res) => {
  try {
    const { mainTitle, subTitle } = req.body;
    const files = req.files;
    const imageNames = [];
    const imageURLs = [];

    if (!mainTitle || !subTitle) {
      return res.status(404).json({ error: "Please fill in all the fields" });
    }

    await Promise.all(
      files.map(async (file) => {
        const { buffer, originalname, mimetype } = file;
        const imageName = `${Date.now()}_${originalname}`;
        const imageUrl = await uploadImage(buffer, imageName, mimetype); // Assuming uploadImage returns a URL
        imageNames.push(imageName);
        imageURLs.push(imageUrl);
      })
    );

    const newOffers = new Offers({
      mainTitle,
      subTitle,
      imageNames,
      imageURLs,
    });

    await newOffers.save();
    res
      .status(200)
      .json({ message: "Offers saved successfully", offers: newOffers });
  } catch (error) {
    console.log("Error in addOffers controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getOffers = async (req, res) => {
  try {
    const allOffers = await Offers.find();
    const offersDetails = allOffers[0];
    res.status(200).json(offersDetails);
  } catch (error) {
    console.log("Error in getOffers controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const updateOffers = async (req, res) => {
  try {
    const { id: offersId } = req.params;
    const { mainTitle, subTitle } = req.body;

    const offer = await Offers.findById(offersId);
    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    if (req.files && req.files.length === 5) {
      const imageNames = [];
      const imageURLs = [];
      const files = req.files;
      try {
        await Promise.all(
          offer.imageNames.map(async (imageName) => {
            await deleteFile(`images/${imageName}`);
          })
        );
        await Promise.all(
          files.map(async (file) => {
            const { buffer, originalname, mimetype } = file;
            const imageName = `${Date.now()}_${originalname}`;
            const imageUrl = await uploadImage(buffer, imageName, mimetype); // Assuming uploadImage returns a URL
            imageNames.push(imageName);
            imageURLs.push(imageUrl);
          })
        );
        offer.imageNames = imageNames;
        offer.imageURLs = imageURLs;
      } catch (error) {
        console.error("An error occurred during file handling:", error.message);
      }
    }

    if (mainTitle) offer.mainTitle = mainTitle;
    if (subTitle) offer.subTitle = subTitle;

    await offer.save();
    io.emit("updatedOffers", offer);
    res
      .status(200)
      .json({ message: "offer updated successfully", offer: offer });
  } catch (error) {
    console.log("Error in updateOffers controller:", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
