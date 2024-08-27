import multer from "multer";

const storage = multer.diskStorage({
  destination: "./historyImg/", // specify the folder to save uploaded files
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  // Allow only image files
  if (!file.originalname.match(/\.(jpeg|jpg|png|gif)$/i)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter }).single("image");

const uploadHistoryRoute = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.error("error in upload history route:", err);
      res.status(400).json({ message: err });
    }
    next();
  });
};

export default uploadHistoryRoute;
