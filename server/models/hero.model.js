import mongoose from "mongoose";

const heroSchema = mongoose.Schema(
  {
    videoName: {
      type: String,
      default: "",
    },
    videoURL: {
      type: String,
      default: "",
    },
    mainTitle: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Hero = mongoose.model("Hero", heroSchema);

export default Hero;
