import { useEffect } from "react";
import { useSocketContext } from "../../context/SocketContext";

import useTestimonialStorage from "../../zustand/useTestimonialStorage";

const useListenTestimonials = () => {
  const { socket } = useSocketContext();
  const { addTestimonial } = useTestimonialStorage();

  useEffect(() => {
    socket?.on("newTestimonial", (newTestimonial) => {
      addTestimonial(newTestimonial);
    });

    return () => {
      socket?.off("newTestimonial");
    };
  }, [socket, addTestimonial]);
};

export default useListenTestimonials;
