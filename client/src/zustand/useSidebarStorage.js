import { create } from "zustand";

const useSidebarStorage = create((set) => ({
  isSidebarClose: false,
  setIsSidebarClose: (isSidebarClose) => set({ isSidebarClose }),
}));

export default useSidebarStorage;
