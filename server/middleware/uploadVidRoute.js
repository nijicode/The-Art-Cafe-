import multer from "multer";

const storage = multer.diskStorage({
  destination: "./bgVid/", // specify the folder to save uploaded files
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  // Allow only .mp4 files
  if (!file.originalname.match(/\.(mp4)$/)) {
    return cb(new Error("Only .mp4 files are allowed!"), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter }).single("bgVideo");

const uploadVidRoute = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ message: err });
    }
    next();
  });
};

export default uploadVidRoute;
