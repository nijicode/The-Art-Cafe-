import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const useUpdateHistory = () => {
  const [loading, setLoading] = useState(false);

  const updateHistory = async (uploadImage, input, category) => {
    const formData = new FormData();
    formData.append("description", input);
    if (uploadImage) {
      formData.append("image", uploadImage);
    }
    setLoading(true);
    try {
      const res = await axios.put(`/api/history/${category}/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = res.data;
      console.log("Response data:", data);
      if (data.error) {
        throw new Error(data.error);
      }
      setTimeout(() => {
        toast.success(data);
      }, 2000);
    } catch (error) {
      if (error.response.data.error) {
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
  return { loading, updateHistory };
};

export default useUpdateHistory;
