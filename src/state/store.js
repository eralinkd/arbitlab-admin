import { create } from "zustand";

const useStore = create((set) => ({
  toastrRef: null,
  setToastrRef: (toastrRef) => set({ toastrRef }),

  showToastr: {},
  setShowToastr: (newData) => set({ showToastr: newData }),

  isLoggedIn: true,
  setIsLoggedIn: (newData) => set({ isLoggedIn: newData }),

  welcomeData: "NODATA!",
  setwelcomeData: (newData) => set({ welcomeData: newData }),

  subscriptionsNames: {},
  setSubscriptionsNames: (newData) => set({ subscriptionsNames: newData }),
}));

export default useStore;
