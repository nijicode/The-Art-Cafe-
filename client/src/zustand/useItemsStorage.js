import { create } from "zustand";

const useItemsStorage = create((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  addItem: (newItem) =>
    set((state) => ({
      items: [...state.items, newItem],
    })),
  updateItem: (updatedItem) =>
    set((state) => ({
      items: state.items.map((item) =>
        item._id === updatedItem._id ? updatedItem : item
      ),
    })),
  deleteItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item._id !== id),
    })),
}));

export default useItemsStorage;
