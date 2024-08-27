import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const useUpdateHero = () => {
  const [loading, setLoading] = useState(false);

  const updateHero = async (uploadVideo, mainTitle, subTitle) => {
    const formData = new FormData();
    formData.append("header1", mainTitle);
    formData.append("header2", subTitle);

    if (uploadVideo) {
      formData.append("bgVideo", uploadVideo);
    }

    console.log(formData);
    setLoading(true);
    try {
      const res = await axios.put(`/api/hero/hero-details/update`, formData, {
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
        toast.success("Hero has been edited");
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
  return { loading, updateHero };
};

export default useUpdateHero;
