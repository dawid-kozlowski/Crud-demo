import { create } from "zustand";
import type { Campaign } from "../types";
import { calculateBalance } from "../lib/utils";



interface CampaignStoreType {
  selectedCampaign: Campaign | null;
  setSelectedCampaign: (campaign: Campaign | null) => void;
  campaigns: Campaign[];
  setCampaigns: (campaigns: Campaign[]) => void;
  addCampaign: (campaign: Campaign) => void;
  updateCampaign: (id: string, updated: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;
  balance: number;
}



const INITIAL_BUDGET = 200000;

export const useCampaignStore = create<CampaignStoreType>((set) => ({
  selectedCampaign: null,
  setSelectedCampaign: (campaign) => set({ selectedCampaign: campaign }),
  campaigns: [],
  setCampaigns: (campaigns) =>
    set({
      campaigns,
      balance: calculateBalance(campaigns, INITIAL_BUDGET),
    }),
  addCampaign: (campaign) =>
    set((state) => {
      const newCampaigns = [...state.campaigns, campaign];
      return {
        campaigns: newCampaigns,
        balance: calculateBalance(newCampaigns, INITIAL_BUDGET),
      };
    }),
  updateCampaign: (id, updated) =>
    set((state) => {
      const newCampaigns = state.campaigns.map((c) =>
        c.id === id ? { ...c, ...updated } : c
      );
      return {
        campaigns: newCampaigns,
        balance: calculateBalance(newCampaigns, INITIAL_BUDGET),
      };
    }),
  deleteCampaign: (id) =>
    set((state) => {
      const newCampaigns = state.campaigns.filter((c) => c.id !== id);
      return {
        campaigns: newCampaigns,
        balance: calculateBalance(newCampaigns, INITIAL_BUDGET),
      };
    }),
  balance: INITIAL_BUDGET,
}));
