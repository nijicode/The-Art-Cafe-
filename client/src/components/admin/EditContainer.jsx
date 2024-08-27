import React, { useState } from "react";
import MenuList from "./MenuList";
import useLinkStorage from "../../zustand/useLinkStorage";
import EditHistory from "./EditHistory";
import EditHero from "./EditHero";
import EditSpecialOffers from "./EditSpecialOffers";
import EditMenu from "./EditMenu";
import AddMenu from "./AddMenu";
import useSidebarStorage from "../../zustand/useSidebarStorage";
import { BiSidebar } from "react-icons/bi";
import { RiMenu2Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { navList } from "../../assets/navlinks";

const EditContainer = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const { isSidebarClose, setIsSidebarClose } = useSidebarStorage();
  const { activeLink, setActiveLink } = useLinkStorage();
  return (
    <div className=" w-full overflow-auto duration-500 relative">
      <div className="sticky flex items-center justify-between p-5 z-[50] bg-zinc-800 h-[80px] top-0 w-full">
        <div
          className="lg:hidden p-2  duration-500 cursor-pointer  hover:bg-black rounded-lg tooltip tooltip-right"
          data-tip={isNavOpen ? "Close Navbar" : "Open Navbar"}
          style={{
            "--tooltip-color": "black", // Custom background color
            // Custom text color
          }}
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          {isNavOpen ? <IoClose size={25} /> : <RiMenu2Fill size={25} />}
        </div>

        <div
          className={`absolute top-16 left-3 z-[100] lg:hidden bg-black rounded-lg duration-500 ${
            isNavOpen ? "translate-x-0" : "-translate-x-[110%]"
          }`}
        >
          <div className=" p-4 flex flex-col gap-4">
            {navList.map((nav, index) => (
              <div
                key={index}
                className="hover:text-white select-none duration-500 cursor-pointer"
                onClick={() => setActiveLink(index)}
              >
                {nav.name}
              </div>
            ))}
          </div>
        </div>
        <div
          className={`${
            isSidebarClose ? "lg:flex" : "lg:hidden"
          } hidden  gap-4  items-center`}
        >
          <div
            className={` p-2  duration-500 cursor-pointer hover:bg-black rounded-lg tooltip tooltip-bottom before:-translate-x-4 after:border-4 `}
            data-tip="Open Sidebar"
            style={{
              "--tooltip-color": "black", // Custom background color
              // Custom text color
            }}
            onClick={() => setIsSidebarClose(!isSidebarClose)}
          >
            <BiSidebar size={25} />
          </div>
          <div className="font-bold text-xl">Art-Café</div>
        </div>
        <div className="font-bold absolute left-[50%] -translate-x-[40px] text-xl lg:hidden">
          Art-Café
        </div>
        <div className="font-bold text-sm text-accent">
          {navList[activeLink].name}{" "}
        </div>
      </div>

      {activeLink === 0 && <MenuList />}
      {activeLink === 1 && <EditHero />}
      {activeLink === 2 && <EditHistory />}
      {activeLink === 3 && <EditSpecialOffers />}
      {activeLink === 4 && <EditMenu />}
      {activeLink === 5 && <AddMenu />}
    </div>
  );
};

export default EditContainer;
