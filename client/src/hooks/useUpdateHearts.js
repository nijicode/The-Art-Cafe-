import axios from "axios";
import useItemsStorage from "../zustand/useItemsStorage";
import { toast } from "sonner";

const useUpdateHearts = () => {
  const { items, setItems } = useItemsStorage();

  const updateHearts = async (heartCount, itemId, itemName) => {
    const newHearts = { hearts: heartCount };

    const updatedItems = items.map((item) =>
      item._id === itemId ? { ...item, hearts: heartCount } : item
    );

    setItems(updatedItems);
    try {
      const res = await axios.patch(
        `/api/item/update/hearts/${itemId}`,
        newHearts
      );
      const data = res.data;

      if (data.error) {
        throw new Error(data.error);
      }
      toast.message(`You hearted ${itemName}!`, {
        description: `Thanks for showing love to ${itemName}. We appreciate your support!`,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message;
      toast.error(errorMessage);
    }
  };

  return { updateHearts };
};

export default useUpdateHearts;
