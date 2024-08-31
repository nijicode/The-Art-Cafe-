import { useEffect } from "react";
import { useSocketContext } from "../../context/SocketContext";
import useHistoryStorage from "../../zustand/useHistoryStorage";
import useGetHistory from "../useGetHistory";

const useListenHistory = () => {
  const { socket } = useSocketContext();
  const { updateHistory } = useHistoryStorage();

  useEffect(() => {
    socket?.on("updatedHistory", (updatedHistory) => {
      updateHistory(updatedHistory);
    });

    return () => {
      socket?.off("updatedHistory");
    };
  }, [socket, updateHistory]);
};

export default useListenHistory;
