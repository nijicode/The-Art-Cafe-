import { create } from "zustand";

const useLinkStorage = create((set) => ({
  activeLink: 0,
  setActiveLink: (activeLink) => set({ activeLink }),
}));

export default useLinkStorage;
