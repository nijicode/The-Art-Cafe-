import { io } from "../socket/socket.js";
import { deleteFile, uploadVideo } from "./file.controller.js";
import Hero from "../models/hero.model.js";

export const addHero = async (req, res) => {
  try {
    const { mainTitle, subTitle } = req.body;
    const { buffer, originalname, mimetype } = req.file;
    const videoName = `${Date.now()}_${originalname}`;

    if (!mainTitle || !subTitle) {
      return res.status(404).json({ error: "Please fill in all the fields" });
    }

    const downloadURL = await uploadVideo(buffer, videoName, mimetype);

    const newHero = new Hero({
      videoName,
      videoURL: downloadURL,
      mainTitle,
      subTitle,
    });

    await newHero.save();

    res.status(200).json({ message: "Hero saved successfully", Hero: newHero });
  } catch (error) {
    console.log("Error in addHero controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getHero = async (req, res) => {
  try {
    const allHero = await Hero.find();
    const heroDetails = allHero[0];
    res.status(200).json(heroDetails);
  } catch (error) {
    console.log("Error in getHero controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const updateHero = async (req, res) => {
  try {
    const { id: heroId } = req.params;
    const { mainTitle, subTitle } = req.body;

    const hero = await Hero.findById(heroId);
    if (!hero) {
      return res.status(404).json({ error: "Hero not found" });
    }

    if (req.file) {
      const { buffer, originalname, mimetype } = req.file;
      const videoName = `${Date.now()}_${originalname}`;
      await deleteFile(`videos/${hero.videoName}`);
      const downloadURL = await uploadVideo(buffer, videoName, mimetype);
      hero.videoName = videoName;
      hero.videoURL = downloadURL;
    }

    if (mainTitle) hero.mainTitle = mainTitle;
    if (subTitle) hero.subTitle = subTitle;

    await hero.save();

    io.emit("newHero", hero);
    res.status(200).json({ message: "Hero updated successfully", hero: hero });
  } catch (error) {
    console.log("Error in updateHero controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
