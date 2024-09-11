import { create } from "zustand";

const useStore = create((set) => ({
  toastrRef: null,
  setToastrRef: (toastrRef) => set({ toastrRef }),

  isLoggedIn: false,
  setIsLoggedIn: (newData) => set({ isLoggedIn: newData }),
}));

export default useStore;
