import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const useUpdateHero = () => {
  const [loading, setLoading] = useState(false);

  const updateHero = async (uploadVideo, mainTitle, subTitle, heroId) => {
    const formData = new FormData();
    formData.append("mainTitle", mainTitle);
    formData.append("subTitle", subTitle);

    if (uploadVideo) {
      formData.append("video", uploadVideo);
    }
    setLoading(true);
    try {
      const res = await axios.put(`/api/hero/update/${heroId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = res.data;
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
