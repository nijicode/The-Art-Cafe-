import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import useTestimonialStorage from "../zustand/useTestimonialStorage";

const useAddTestimonial = () => {
  const { testimonials, setTestimonials } = useTestimonialStorage();
  const [loading, setLoading] = useState(false);

  const addTestimonial = async ({ name, email, message }, rating) => {
    if (!name || !email || !message) {
      return toast.error("Please Fill in all fields");
    }

    const newTestimonial = { name, email, message, ratings: rating };
    setLoading(true);
    try {
      const res = await axios.post("/api/testimonial/add", newTestimonial);
      const data = res.data;

      if (data.error) {
        throw new Error(data.error);
      }
      toast.message(`Cheers to your feedback !${name}`, {
        description: `We’re grateful for your review and excited to continue improving. Thank you for your support!`,
      });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return { loading, addTestimonial };
};

export default useAddTestimonial;
