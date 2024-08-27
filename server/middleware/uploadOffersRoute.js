import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: "./offersImg/", // specify the folder to save uploaded files
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    // Allow only image files
    if (!file.originalname.match(/\.(jpeg|jpg|png|gif)$/i)) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit to 10MB
}).array("images");

const uploadOffersRoute = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ message: err });
    }

    const files = req.files || [];

    if (files.length !== 5) {
      // Clean up any files that were uploaded before sending the error
      files.forEach((file) =>
        fs.unlink(
          path.join(__dirname, "..", "..", "offersImg", file.filename),
          (err) => {
            if (err) console.error("Error deleting old video file:", err);
          }
        )
      );
      console.log("images not changed, Please upload exactly 5 photos");
    }

    next();
  });
};

export default uploadOffersRoute;
