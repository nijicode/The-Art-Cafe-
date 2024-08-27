import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const useAddCategory = () => {
  const [loading, setLoading] = useState(false);

  const addCategory = async (title) => {
    if (!title) {
      return toast.error("Invalid input");
    }
    setLoading(true);
    try {
      const res = await axios.post("/api/category/add", { title });
      const data = res.data;

      if (data.error) {
        throw new Error(data.error);
      }
      toast.success(`${title} has been added`);
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
  return { loading, addCategory };
};

export default useAddCategory;
