import React, { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";
import useLinkStorage from "../../zustand/useLinkStorage";
import { BiSidebar } from "react-icons/bi";
import useSidebarStorage from "../../zustand/useSidebarStorage";
import { navList } from "../../assets/navlinks";
export const Sidebar = () => {
  const { isSidebarClose, setIsSidebarClose } = useSidebarStorage();
  const { activeLink, setActiveLink } = useLinkStorage();
  const handleLink = (index) => {
    setActiveLink(index);
  };

  return (
    <div
      className={`h-full shrink-0 overflow-x-hidden duration-500 relative transform visible whitespace-nowrap ${
        isSidebarClose ? " w-0 " : "w-[250px]  "
      } hidden lg:flex flex-col border-r-2 bg-black 
      `}
    >
      <div className="flex h-full flex-col w-[250px] py-5 px-5">
        <div>
          <div
            className="p-2 duration-500 cursor-pointer hover:bg-opacity-50 hover:bg-zinc-700 rounded-lg tooltip tooltip-right "
            data-tip="Close Sidebar"
            style={{
              "--tooltip-color": "#3f3f46", // Custom background color
              // Custom text color
            }}
            onClick={() => setIsSidebarClose(!isSidebarClose)}
          >
            <BiSidebar size={25} />
          </div>
        </div>

        <h1 className="text-center text-3xl font-bold mt-5 text-white">
          Art-Café
        </h1>
        <p className="text-sm opacity-50 text-center text-white">admin panel</p>
        <div className="divider"></div>
        {navList.map((nav, index) => (
          <div className="flex flex-col" key={index}>
            <button
              className={`btn rounded-md border-none ${
                activeLink === index ? "bg-zinc-800" : "bg-transparent"
              }`}
              onClick={() => handleLink(index)}
            >
              {nav.name}
            </button>
            <div className="divider p-0 m-0"></div>
          </div>
        ))}

        <LogoutButton />
      </div>
    </div>
  );
};
