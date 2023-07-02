import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

export const useDealsStore = create(
  devtools((set, get) => ({
    dealsData: [],
    updateDeal: (newDealsdata: any) => set({ dealsData: newDealsdata }),
    deleteDeal: (dealId: any[]) =>
      set({ dealsData: dealId.filter(({ id }) => id !== dealId) }),
  }))
);
