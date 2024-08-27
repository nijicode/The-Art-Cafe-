import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
