import mongoose from "mongoose";

const offersSchema = mongoose.Schema(
  {
    imageNames: [
      {
        type: String,
        default: [],
      },
    ],
    imageURLs: [
      {
        type: String,
        default: [],
      },
    ],
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

const Offers = mongoose.model("Offers", offersSchema);

export default Offers;
