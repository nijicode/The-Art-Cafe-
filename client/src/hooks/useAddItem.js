import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const useAddItems = () => {
  const [loading, setLoading] = useState(false);

  const addItem = async (categoryId, productDetails, image) => {
    if (!image) {
      return toast.error("image is required");
    }
    const formData = new FormData();
    formData.append("productName", productDetails.productName);
    formData.append("mPrice", productDetails.mPrice);
    formData.append("lPrice", productDetails.lPrice);
    formData.append("description", productDetails.description);
    formData.append("image", image);
    setLoading(true);
    try {
      const res = await axios.post(
        `/api/item/add/category/${categoryId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = res.data;

      if (data.error) {
        throw new Error(data.error);
      }
      setTimeout(() => {
        toast.success("Product has been added");
      }, 2000);
    } catch (error) {
      if (error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
      console.log(error.response.data.error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };
  return { loading, addItem };
};

export default useAddItems;
