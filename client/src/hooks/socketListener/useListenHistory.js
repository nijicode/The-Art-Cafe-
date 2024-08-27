import { useEffect } from "react";
import { useSocketContext } from "../../context/SocketContext";
import useHistoryStorage from "../../zustand/useHistoryStorage";

const useListenHistory = () => {
  const { socket } = useSocketContext();
  const { setMission, setVision, setValues } = useHistoryStorage();

  useEffect(() => {
    socket?.on("newMission", (newMission) => {
      setMission(newMission);
    });

    socket?.on("newVision", (newVision) => {
      setVision(newVision);
    });

    socket?.on("newValues", (newValues) => {
      setValues(newValues);
    });

    return () => {
      socket?.off("newMission");
      socket?.off("newVision");
      socket?.off("newValues");
    };
  }, [socket, setMission, setVision, setValues]);
};

export default useListenHistory;
