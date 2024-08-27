import { create } from "zustand";

const useOfferStorage = create((set) => ({
  offers: {},
  setOffers: (offers) => set({ offers }),
}));

export default useOfferStorage;
