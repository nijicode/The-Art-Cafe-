import axios from "axios";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import useTestimonialStorage from "../zustand/useTestimonialStorage";

const useGetTestimonials = () => {
  const [loading, setLoading] = useState(false);
  const { setTestimonials } = useTestimonialStorage();

  useEffect(() => {
    const getTestimonial = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/testimonial/get");
        const data = res.data;
        if (data.error) {
          throw new Error(data.error);
        }
        setTestimonials(data);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.error);
        } else {
          toast.error(error.message);
        }
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };

    getTestimonial();
  }, []);

  return { loading };
};

export default useGetTestimonials;
