import React from "react";
import { BiLogOutCircle } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import useLinkStorage from "../../zustand/useLinkStorage";
const LogoutButton = () => {
  const { loading, logout } = useLogout();
  const { setActiveLink } = useLinkStorage();

  const handleLogout = () => {
    logout();
    setActiveLink(0);
  };
  return (
    <button className="mt-auto text-2xl">
      {!loading ? (
        <BiLogOutCircle
          className="cursor-pointer hover:scale-110 duration-500"
          onClick={handleLogout}
        />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </button>
  );
};

export default LogoutButton;
