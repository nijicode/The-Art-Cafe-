import { useEffect } from "react";
import { useSocketContext } from "../../context/SocketContext";
import useOfferStorage from "../../zustand/useOfferStorage";

const useListenOffers = () => {
  const { socket } = useSocketContext();
  const { setOffers } = useOfferStorage();

  useEffect(() => {
    socket?.on("updatedOffers", (updatedOffers) => {
      setOffers(updatedOffers);
    });

    return () => {
      socket?.off("updatedOffers");
    };
  }, [socket, setOffers]);
};

export default useListenOffers;
