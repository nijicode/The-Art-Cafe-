import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const useDeleteItem = () => {
  const [deleting, setDeleting] = useState(false);

  const deleteItem = async (itemId) => {
    setDeleting(true);
    try {
      const res = await axios.delete(`/api/item/delete/${itemId}`);
      const data = res.data;
      console.log("Response data:", data);
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("item deleted successfully");
    } catch (error) {
      if (error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
    } finally {
      setDeleting(false);
    }
  };
  return { deleting, deleteItem };
};

export default useDeleteItem;
