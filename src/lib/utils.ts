import type { Campaign } from "../types";

export const parseKeywords = (value: string): string[] => {
    return value
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k !== "");
};

export const calculateBalance = (
    campaigns: Campaign[],
    budget: number
): number => {
    return budget - campaigns.reduce((sum, c) => sum + c.campaignFund, 0);
};
