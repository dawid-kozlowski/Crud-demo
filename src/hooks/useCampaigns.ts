import { useEffect, useState } from "react";
import { mockCampaigns } from "../lib/mock-campaigns";
import { useCampaignStore } from "../stores/useCampaignStore";
import type { Campaign } from "../types";

const useCampaigns = () => {
  const {
    campaigns,
    setCampaigns,
    addCampaign: storeAdd,
    updateCampaign: storeUpdate,
    deleteCampaign: storeDelete,
  } = useCampaignStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //timeout for simulating loading on data fetching
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (campaigns.length === 0) {
          setCampaigns(mockCampaigns);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  });

  const addCampaign = (campaign: Omit<Campaign, "id">) => {
    const newCampaign = { ...campaign, id: Date.now().toString() };
    storeAdd(newCampaign);
    return newCampaign;
  };

  const updateCampaign = (id: string, updated: Partial<Campaign>) => {
    const campaign = campaigns.find((c) => c.id === id);
    if (!campaign) return null;

    const updatedCampaign = { ...campaign, ...updated };
    storeUpdate(id, updated);
    return updatedCampaign;
  };

  const deleteCampaign = (id: string) => {
    storeDelete(id);
  };

  return {
    campaigns,
    setCampaigns,
    addCampaign,
    updateCampaign,
    deleteCampaign,
    isLoading,
    error,
  };
};

export default useCampaigns;

export type { Campaign } from "../types";
