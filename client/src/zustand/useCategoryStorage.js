import { create } from "zustand";

const useCategoryStorage = create((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),

  addCategory: (newCategory) => {
    console.trace("addCategory called with:", newCategory);
    set((state) => ({
      categories: [...state.categories, newCategory],
    }));
  },

  // Delete a category by its index or some identifier
  deleteCategory: (id) => {
    console.trace("addCategory called with:", id);
    set((state) => ({
      categories: state.categories.filter((category) => category._id !== id),
    }));
  },
}));

export default useCategoryStorage;
