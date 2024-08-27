import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { promisify } from "util";
import { io } from "../socket/socket.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const offersDetailsPath = path.join(
  __dirname,
  "..",
  "data",
  "offersDetails.json"
);

export const getOffersDetail = (req, res) => {
  fs.readFile(offersDetailsPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading file");
    }
    res.json(JSON.parse(data));
  });
};

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

export const updateOffersDetail = (req, res) => {
  const newImageFiles = req.files || [];
  const newImageUrls = newImageFiles.map((file) => file.filename);
  const { mainTitle, subTitle } = req.body;

  let offersData = {};

  readFile(offersDetailsPath, "utf8")
    .then((data) => {
      try {
        offersData = JSON.parse(data);
      } catch (parseError) {
        throw new Error("Error parsing JSON data");
      }
    })
    .catch((readError) => {
      if (readError.code === "ENOENT") {
        // If the file doesn't exist, initialize with default values
        offersData = { images: [], titles: { mainTitle: "", subTitle: "" } };
      } else {
        // Handle other read errors
        return Promise.reject(new Error("Error reading offers data"));
      }
    })
    .then(() => {
      // If there are new images, delete old images
      if (newImageFiles.length === 5) {
        return Promise.all(
          offersData.images.map((imgUrl) =>
            unlink(path.join(__dirname, "..", "..", "offersImg", imgUrl)).catch(
              (unlinkError) => {
                console.error(
                  `Failed to delete ${imgUrl}: ${unlinkError.message}`
                );
                // Continue to delete other images even if one fails
              }
            )
          )
        ).then(() => {
          // Update offers data with new images
          offersData.images = newImageUrls;
        });
      } else {
        // If there are no new images, keep the old ones
        return Promise.resolve();
      }
    })
    .then(() => {
      // Update offers data with new images and titles
      offersData.titles.mainTitle = mainTitle || offersData.titles.mainTitle;
      offersData.titles.subTitle = subTitle || offersData.titles.subTitle;

      // Write updated data to JSON file
      return writeFile(
        offersDetailsPath,
        JSON.stringify(offersData, null, 2),
        "utf8"
      );
    })
    .then(() => {
      io.emit("updatedOffers", offersData);
      res.status(200).json(offersData);
    })
    .catch((error) => {
      console.error(`Error processing request: ${error.message}`);
      res.status(500).json({ message: "Error processing request" });
    });
};
