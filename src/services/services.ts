import type { Campaign } from "../types";
import type { Field } from "../types";
import { fieldsToCampaign } from "../lib/field-config";

export const addCampaignService = (
  fields: Field[],
  addCampaign: (c: Omit<Campaign, "id">) => Campaign,
  onComplete: (c: Campaign) => void
) => {
  const newCampaign = addCampaign(fieldsToCampaign(fields));
  onComplete(newCampaign);
};

export const updateCampaignService = (
  selectedCampaign: Campaign | null,
  fields: Field[],
  updateCampaign: (id: string, updated: Partial<Campaign>) => Campaign | null,
  onComplete: (c: Campaign) => void
) => {
  if (!selectedCampaign) return;
  const updated = updateCampaign(selectedCampaign.id, fieldsToCampaign(fields));
  if (updated) {
    onComplete(updated);
  }
};

export const deleteCampaignService = (
  selectedCampaign: Campaign | null,
  deleteCampaign: (id: string) => void,
  setSelectedCampaign: (c: Campaign | null) => void
) => {
  if (!selectedCampaign) return;
  deleteCampaign(selectedCampaign.id);
  setSelectedCampaign(null);
};
