import styled from "styled-components";
import FormCard from "./FormCard";
import type { Field } from "../types";
import type { Campaign } from "../hooks/useCampaigns";
import { campaignToFields } from "../lib/field-config";

type WrapperProps = {
  isEditing: boolean;
  selectedCampaign?: Campaign | null;
  data?: Field[];
  onChange?: (index: number, value: string) => void;
  validationErrors?: { [key: string]: string };
};

const Card = {
  Display: function DisplayCard({
    campaign,
    isEditing = false,
  }: {
    campaign: Campaign;
    isEditing?: boolean;
  }) {
    if (!campaign) return null;

    const fields: Field[] = campaignToFields(campaign);

    return (
      <View>
        <Container>
          {fields.map((item) => (
            <TextContainer key={item.label}>
              <Text style={{ fontWeight: "bold" }}>{item.label}</Text>
              {item.label === "Keywords:" ? (
                <Value
                  style={{
                    maxWidth: "100%",
                  }}
                >
                  {item.value}
                </Value>
              ) : item.label === "Campaign name:" ? (
                <Value
                  style={{
                    maxWidth: "15rem",
                  }}
                >
                  {item.value}
                </Value>
              ) : (
                <Text
                  isEditing={isEditing}
                  style={{
                    textAlign: "right",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.2em",
                    justifyContent: "flex-end",
                  }}
                >
                  {item.value}
                  {item.label === "Campaign fund:" && (
                    <Icon className="material-symbols-outlined">diamond</Icon>
                  )}
                  {item.label === "Radius:" && " km"}
                </Text>
              )}
            </TextContainer>
          ))}
        </Container>
      </View>
    );
  },

  Wrapper: function WrapperCard({
    isEditing,
    selectedCampaign,
    data,
    onChange,
    validationErrors,
  }: WrapperProps) {
    if (!selectedCampaign)
      return <View style={{ textAlign: "center" }}>Select a campaign</View>;

    return isEditing && data && onChange ? (
      <FormCard
        data={data}
        isEditing={isEditing}
        onChange={onChange}
        validationErrors={validationErrors}
      />
    ) : (
      <Card.Display campaign={selectedCampaign} />
    );
  },
};

export default Card;

export const Container = styled.div`
  display: flex;
  min-height: 27em;
  flex-direction: column;
  background-color: var(--surface);
  border-radius: var(--radius);
  border: 1px solid var(--border);
  padding: 0.5em 1em;
  gap: 0.25em;
  min-width: 24em;
  justify-content: center;
`;

export const TextContainer = styled.div`
  display: flex;
  gap: 2em;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-muted);
  align-items: center;
  min-height: 3.5em;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const Text = styled.p<{ isEditing?: boolean }>`
  align-self: center;
  margin: 0;
  padding: 1em 0;
  max-width: 10rem;
  overflow-wrap: break-word;
  font-weight: normal;
  cursor: default;
`;

export const View = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const Icon = styled.p`
  margin: 0;
  font-size: var(--icon-size);
  display: flex;
  align-items: center;
  margin-left: 2px;
`;

const Value = styled.p`
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  font-weight: normal;
`;
