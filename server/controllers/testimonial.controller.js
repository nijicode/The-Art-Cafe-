import Testimonial from "../models/testimonial.model.js";
import { io } from "../socket/socket.js";

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const addTestimonial = async (req, res) => {
  try {
    const { name, ratings, email, message } = req.body;

    if (!name || !ratings || !email || !message) {
      return res.status(404).json({ error: "Please fill in all the fields" });
    }
    if (!isValidEmail(email)) {
      return res.status(404).json({ error: "Email is not valid" });
    }
    if (message.length < 50) {
      return res.status(404).json({
        error: "The review is too short. Please write at least 50 characters.",
      });
    } else if (message.length > 150) {
      return res.status(404).json({
        error:
          "The review is too long. Please limit your review to 150 characters.",
      });
    }
    const newTestimonial = new Testimonial({
      name,
      ratings,
      email,
      message,
    });
    await newTestimonial.save();

    io.emit("newTestimonial", newTestimonial);
    res.status(201).json(newTestimonial);
    console.log("Testimonial added");
  } catch (error) {
    console.log("Error in addTestimonial controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getTestimonials = async (req, res) => {
  try {
    let allTestimonial = await Testimonial.find();
    res.status(200).json(allTestimonial);
  } catch (error) {
    console.log("Error in getTestimonial controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const { id: testimonialId } = req.params;
    const testimonial = await Testimonial.findById(testimonialId);

    if (!testimonial) {
      return res.status(404).json({ error: "Testimonial not found" });
    }
    await Testimonial.deleteOne({ _id: testimonialId });
    res.status(200).json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    console.log("Error in deleteTestimonial controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
