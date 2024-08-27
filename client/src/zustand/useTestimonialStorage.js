import { create } from "zustand";

const useTestimonialStorage = create((set) => ({
  testimonials: [],
  setTestimonials: (testimonials) => set({ testimonials }),
  addTestimonial: (newTestimonial) =>
    set((state) => ({ testimonials: [...state.testimonials, newTestimonial] })),
}));

export default useTestimonialStorage;
