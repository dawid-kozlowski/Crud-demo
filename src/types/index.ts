export type Campaign = {
    id: string;
    campaignName: string;
    keywords: string[];
    bidAmount: number;
    campaignFund: number;
    status: "Active" | "Inactive";
    town: string;
    radius: number;
};

export type Field = {
    label: string;
    value: string;
    type: "text" | "select" | "checkbox";
    placeholder?: string;
};

export type FieldConfig = {
    label: string;
    key: keyof Campaign;
    type: "text" | "select" | "checkbox";
    placeholder?: string;
};
