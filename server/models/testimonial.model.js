import mongoose from "mongoose";

const testimonialSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ratings: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
      minlength: 50,
      maxlength: 150,
    },
  },
  { timestamps: true }
);

const Testimonial = mongoose.model("Testimonial", testimonialSchema);
export default Testimonial;
