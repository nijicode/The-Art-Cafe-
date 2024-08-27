import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useItemsStorage from "../zustand/useItemsStorage";

const useGetItems = () => {
  const [loading, setLoading] = useState(false);
  const { setItems } = useItemsStorage();

  useEffect(() => {
    const getItems = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/item/all");
        const data = res.data;
        if (data.error) {
          throw new Error(data.error);
        }
        setItems(data);
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

    getItems();
  }, []);

  return { loading };
};

export default useGetItems;
