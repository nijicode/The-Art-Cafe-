import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const useGetItemsByCategory = () => {
  const [loading, setLoading] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [itemsByCategory, setItemsByCategory] = useState({});

  const getItemsByCategory = async (categoryId) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/item/get/category/${categoryId}`);
      const data = res.data;
      if (data.error) {
        throw new Error(data.error);
      }
      setFilteredItems(data);

      setItemsByCategory((prevItemsByCategory) => ({
        ...prevItemsByCategory,
        [categoryId]: data,
      }));
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

  return { loading, filteredItems, getItemsByCategory, itemsByCategory };
};

export default useGetItemsByCategory;
