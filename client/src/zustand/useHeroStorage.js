import { create } from "zustand";

const useHeroStorage = create((set) => ({
  hero: {},
  setHero: (hero) => set({ hero }),
}));

export default useHeroStorage;
