import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import useOfferStorage from "../zustand/useOfferStorage";

const useUpdateOffers = () => {
  const [loading, setLoading] = useState(false);
  const { setOffers } = useOfferStorage();

  const updateOffers = async (selectedFiles, inputs, offersId) => {
    const formData = new FormData();
    formData.append("mainTitle", inputs.mainTitle);
    formData.append("subTitle", inputs.subTitle);
    if (selectedFiles.length === 5) {
      selectedFiles.forEach((file) => {
        formData.append("images", file);
      });
    }
    setLoading(true);
    try {
      const res = await axios.put(`/api/offers/update/${offersId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = res.data;

      if (data.error) {
        throw new Error(data.error);
      }
      setTimeout(() => {
        toast.success("Offers Updated");
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
  return { loading, updateOffers };
};

export default useUpdateOffers;
