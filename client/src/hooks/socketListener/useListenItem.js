import { useEffect } from "react";
import { useSocketContext } from "../../context/SocketContext";
import useItemsStorage from "../../zustand/useItemsStorage";

const useListenItems = () => {
  const { socket } = useSocketContext();
  const { items, setItems, updateItem, deleteItem, addItem } =
    useItemsStorage();

  useEffect(() => {
    socket?.on("newItem", (newItem) => {
      console.log(items);
      addItem(newItem);
    });

    socket?.on("updatedHearts", (updatedHearts) => {
      updateItem(updatedHearts);
    });

    socket?.on("updatedItem", (updatedItem) => {
      updateItem(updatedItem);
    });

    socket?.on("deleteItemId", (deleteItemId) => {
      deleteItem(deleteItemId);
    });

    return () => {
      socket?.off("newItem");
      socket?.off("updatedHearts");
      socket?.off("updatedItem");
      socket?.off("deleteItemId");
    };
  }, [socket, setItems, updateItem, deleteItem]);
};

export default useListenItems;
