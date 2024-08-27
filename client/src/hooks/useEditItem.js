import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const useEditItem = () => {
  const [editing, setEditing] = useState(false);

  const editItem = async (uploadImage, inputs, itemId) => {
    const formData = new FormData();
    formData.append("productName", inputs.productName);
    formData.append("mPrice", inputs.mPrice);
    formData.append("lPrice", inputs.lPrice);
    formData.append("description", inputs.description);
    if (uploadImage) {
      formData.append("image", uploadImage);
    }

    setEditing(true);
    try {
      const res = await axios.put(`/api/item/edit/${itemId}`, formData, {
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
        toast.success("Product has been edited");
      }, 2000);
    } catch (error) {
      if (error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
    } finally {
      setTimeout(() => {
        setEditing(false);
      }, 2000);
    }
  };
  return { editing, editItem };
};

export default useEditItem;
