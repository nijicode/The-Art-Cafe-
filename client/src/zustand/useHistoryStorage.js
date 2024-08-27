import { create } from "zustand";

const useHistoryStorage = create((set) => ({
  history: {
    mission: {
      image: "",
      description: "",
    },
    vision: {
      image: "",
      description: "",
    },
    values: {
      image: "",
      description: "",
    },
  },
  setHistory: (newHistory) =>
    set((state) => ({
      history: { ...state.history, ...newHistory },
    })),
  setMission: (newDetails) =>
    set((state) => {
      const oldDetails = state.history.mission;
      return {
        history: {
          ...state.history,
          mission: {
            ...oldDetails,
            ...newDetails,
          },
        },
      };
    }),
  setVision: (newDetails) =>
    set((state) => {
      const oldDetails = state.history.vision;
      return {
        history: {
          ...state.history,
          vision: {
            ...oldDetails,
            ...newDetails,
          },
        },
      };
    }),
  setValues: (newDetails) =>
    set((state) => {
      const oldDetails = state.history.values;
      return {
        history: {
          ...state.history,
          values: {
            ...oldDetails,
            ...newDetails,
          },
        },
      };
    }),
}));

export default useHistoryStorage;
