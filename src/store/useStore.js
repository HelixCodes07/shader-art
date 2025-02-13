import { create } from "zustand";

const useTalhaStore = create((set) => ({
  isLoading: false,
  setIsLoading: (state) => set({ isLoading: state }),
}));

export default useTalhaStore;
