import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const viteSocket = import.meta.env.VITE_SOCKET_URL;

  console.log("socket:", viteSocket);

  useEffect(() => {
    // Initialize the socket connection when the component is mounted
    const newSocket = io(viteSocket); // Replace with your socket server URL
    setSocket(newSocket);

    // Clean up the socket connection when the component is unmounted
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
