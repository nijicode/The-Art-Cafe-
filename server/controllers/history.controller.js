import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { io } from "../socket/socket.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const missionDetails = path.join(__dirname, "..", "data", "mission.json");
const visionDetails = path.join(__dirname, "..", "data", "vision.json");
const valuesDetails = path.join(__dirname, "..", "data", "values.json");

const readJSONFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error(`Error reading file at ${filePath}:`, err);
        return reject(err);
      }
      try {
        const jsonData = JSON.parse(data);
        resolve(jsonData);
      } catch (parseError) {
        console.error(
          `Error parsing JSON data from file at ${filePath}:`,
          parseError
        );
        reject(parseError);
      }
    });
  });
};

export const getHistory = async (req, res) => {
  try {
    const [mission, vision, values] = await Promise.all([
      readJSONFile(missionDetails),
      readJSONFile(visionDetails),
      readJSONFile(valuesDetails),
    ]);
    res.json({
      mission,
      vision,
      values,
    });
  } catch (error) {
    console.error("Error in getHistory:", error);
    res.status(500).json({ error: "Error reading JSON files" });
  }
};

export const updateMission = (req, res) => {
  const { description } = req.body;
  const image = req.file ? req.file.filename : null;

  fs.readFile(missionDetails, "utf8", (err, data) => {
    if (err) {
      console.error("Error in updateMission:", err);
      return res.status(500).send("Error reading file");
    }

    const oldDetails = JSON.parse(data);

    if (oldDetails.image && req.file) {
      fs.unlink(
        path.join(__dirname, "..", "..", "historyImg", oldDetails.image),
        (err) => {
          if (err) console.error("Error deleting old video file:", err);
        }
      );
    }

    const newDetails = {
      image: image || oldDetails.image,
      description,
    };

    fs.writeFile(
      missionDetails,
      JSON.stringify(newDetails, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error("Error in updateMission:", err);
          return res.status(500).send("Error writing file");
        }
        io.emit("newMission", newDetails);
        res.send("Mission details updated successfully");
      }
    );
  });
};
export const updateVision = (req, res) => {
  const { description } = req.body;
  const image = req.file ? req.file.filename : null;

  fs.readFile(visionDetails, "utf8", (err, data) => {
    if (err) {
      console.error("Error in updateVission:", err);
      return res.status(500).send("Error reading file");
    }

    const oldDetails = JSON.parse(data);

    if (oldDetails.image && req.file) {
      fs.unlink(
        path.join(__dirname, "..", "..", "historyImg", oldDetails.image),
        (err) => {
          if (err) console.error("Error deleting old video file:", err);
        }
      );
    }

    const newDetails = {
      image: image || oldDetails.image,
      description,
    };
    fs.writeFile(
      visionDetails,
      JSON.stringify(newDetails, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error("Error in updateVision:", err);
          return res.status(500).send("Error writing file");
        }
        io.emit("newVision", newDetails);
        res.send("Vision details updated successfully");
      }
    );
  });
};
export const updateValues = (req, res) => {
  const { description } = req.body;
  const image = req.file ? req.file.filename : null;

  console.log(image);

  fs.readFile(valuesDetails, "utf8", (err, data) => {
    if (err) {
      console.error("Error in updateValues:", err);
      return res.status(500).send("Error reading file");
    }

    const oldDetails = JSON.parse(data);

    if (oldDetails.image && req.file) {
      fs.unlink(
        path.join(__dirname, "..", "..", "historyImg", oldDetails.image),
        (err) => {
          if (err) console.error("Error deleting old video file:", err);
        }
      );
    }

    const newDetails = {
      image: image || oldDetails.image,
      description,
    };
    fs.writeFile(
      valuesDetails,
      JSON.stringify(newDetails, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error("Error in updateValues:", err);
          return res.status(500).send("Error writing file");
        }
        io.emit("newVision", newDetails);
        res.send("Values details updated successfully");
      }
    );
  });
};
