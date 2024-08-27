import { useEffect } from "react";
import { useSocketContext } from "../../context/SocketContext";
import useCategoryStorage from "../../zustand/useCategoryStorage";

const useListenCategory = () => {
  const { socket } = useSocketContext();
  const { addCategory, deleteCategory } = useCategoryStorage();

  useEffect(() => {
    socket?.on("newCategory", (newCategory) => {
      addCategory(newCategory);
    });

    socket?.on("deleteCategoryId", (deleteCategoryId) => {
      deleteCategory(deleteCategoryId);
    });

    return () => {
      socket?.off("newCategory");
      socket?.off("deleteCategory");
    };
  }, [socket, addCategory, deleteCategory]);
};

export default useListenCategory;
