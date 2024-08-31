import { create } from "zustand";

const useHistoryStorage = create((set) => ({
  histories: [],
  setHistories: (histories) => set({ histories }),

  updateHistory: (updatedHistory) =>
    set((state) => ({
      histories: state.histories.map((history) =>
        history._id === updatedHistory._id ? updatedHistory : history
      ),
    })),
}));

export default useHistoryStorage;
