import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const useDeleteCategory = () => {
  const [deleting, setDeleting] = useState(false);

  const deleteCategory = async (categoryId) => {
    setDeleting(true);
    try {
      const res = await axios.delete(`/api/category/delete/${categoryId}`);
      const data = res.data;
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("Category deleted successfully");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
    } finally {
      setDeleting(false);
    }
  };
  return { deleting, deleteCategory };
};

export default useDeleteCategory;
