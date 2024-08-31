import mongoose from "mongoose";

const historySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageName: {
      type: String,
      default: "",
    },
    imageURL: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const History = mongoose.model("History", historySchema);

export default History;
