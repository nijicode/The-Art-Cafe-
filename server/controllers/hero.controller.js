import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { io } from "../socket/socket.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const heroDetailsPath = path.join(__dirname, "..", "data", "heroDetails.json");
export const getHeroDetails = (req, res) => {
  fs.readFile(heroDetailsPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading file");
    }
    res.json(JSON.parse(data));
  });
};

export const updateHeroDetails = (req, res) => {
  const { header1, header2 } = req.body;
  const bgVideo = req.file ? req.file.filename : null;

  fs.readFile(heroDetailsPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading file");
    }

    const oldDetails = JSON.parse(data);
    if (oldDetails.bgVideo && req.file) {
      fs.unlink(
        path.join(__dirname, "..", "..", "bgVid", oldDetails.bgVideo),
        (err) => {
          if (err) console.error("Error deleting old video file:", err);
        }
      );
    }

    const newDetails = {
      bgVideo: bgVideo || oldDetails.bgVideo,
      header1,
      header2,
    };
    fs.writeFile(
      heroDetailsPath,
      JSON.stringify(newDetails, null, 2),
      "utf8",
      (err) => {
        if (err) {
          return res.status(500).send("Error writing file");
        }
        io.emit("newHero", newDetails);
        res.send("Hero details updated successfully");
      }
    );
  });
};
