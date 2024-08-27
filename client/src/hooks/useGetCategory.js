import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useCategoryStorage from "../zustand/useCategoryStorage";

const useGetCategory = () => {
  const [waiting, setWaiting] = useState(false);
  const { setCategories } = useCategoryStorage();

  useEffect(() => {
    const getCategories = async () => {
      setWaiting(true);
      try {
        const res = await axios.get("/api/category/get");
        const data = res.data;
        if (data.error) {
          throw new Error(data.error);
        }
        setCategories(data);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.error);
        } else {
          toast.error(error.message);
        }
      } finally {
        setWaiting(false);
      }
    };

    getCategories();
  }, []);

  return { waiting };
};

export default useGetCategory;
