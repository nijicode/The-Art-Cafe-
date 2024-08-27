import { useEffect } from "react";
import { useSocketContext } from "../../context/SocketContext";

import useHeroStorage from "../../zustand/useHeroStorage";

const useListenHero = () => {
  const { socket } = useSocketContext();
  const { setHero } = useHeroStorage();

  useEffect(() => {
    socket?.on("newHero", (newHero) => {
      setHero(newHero);
    });

    return () => {
      socket?.off("newHero");
    };
  }, [socket, setHero]);
};

export default useListenHero;
