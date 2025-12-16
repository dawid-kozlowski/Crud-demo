import type { Campaign, Field, FieldConfig } from "../types";
import { FIELD_PLACEHOLDERS } from "./constants";
import { parseKeywords } from "./utils";

export const FIELD_CONFIGS: FieldConfig[] = [
    { label: "Campaign name:", key: "campaignName", type: "text", placeholder: FIELD_PLACEHOLDERS["Campaign name:"] },
    { label: "Keywords:", key: "keywords", type: "text" },
    { label: "Bid amount:", key: "bidAmount", type: "text", placeholder: FIELD_PLACEHOLDERS["Bid amount:"] },
    { label: "Campaign fund:", key: "campaignFund", type: "text", placeholder: FIELD_PLACEHOLDERS["Campaign fund:"] },
    { label: "Status:", key: "status", type: "checkbox" },
    { label: "Town:", key: "town", type: "select" },
    { label: "Radius:", key: "radius", type: "text", placeholder: FIELD_PLACEHOLDERS["Radius:"] },
];

export const campaignToFields = (campaign: Campaign): Field[] => {
    return FIELD_CONFIGS.map(({ label, key, type, placeholder }) => ({
        label,
        value:
            key === "keywords" && Array.isArray(campaign[key])
                ? (campaign[key] as string[]).join(", ")
                : campaign[key].toString(),
        type,
        placeholder,
    }));
};

export const fieldsToCampaign = (fields: Field[]): Omit<Campaign, "id"> => {
    const getFieldValue = (label: string): string => {
        return fields.find((f) => f.label === label)?.value || "";
    };

    return {
        campaignName: getFieldValue("Campaign name:"),
        keywords: parseKeywords(getFieldValue("Keywords:")),
        bidAmount: Number(getFieldValue("Bid amount:")),
        campaignFund: Number(getFieldValue("Campaign fund:")),
        status: getFieldValue("Status:") as "Active" | "Inactive",
        town: getFieldValue("Town:"),
        radius: Number(getFieldValue("Radius:")),
    };
};

export const createEmptyFields = (): Field[] => {
    return FIELD_CONFIGS.map(({ label, type, placeholder }) => ({
        label,
        value: type === "checkbox" ? "Inactive" : "",
        type,
        placeholder,
    }));
};

export const getFieldByLabel = (
    fields: Field[],
    label: string
): Field | undefined => {
    return fields.find((f) => f.label === label);
};
