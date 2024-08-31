import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    hearts: {
      type: Number,
      default: 0,
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
      default: "",
    },
    mPrice: {
      type: String,
      required: true,
    },
    lPrice: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);
export default Item;
