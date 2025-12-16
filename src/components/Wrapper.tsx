import styled from "styled-components";
import Card from "./Card";
import List from "./List";
import Balance from "./Balance";
import Menu from "./Menu";
import { useState } from "react";
import FormCard, { type Field } from "./FormCard";
import { useCampaignStore } from "../stores/useCampaignStore";
import {
  addCampaignService,
  updateCampaignService,
  deleteCampaignService,
} from "../services/services";
import useCampaigns, { type Campaign } from "../hooks/useCampaigns";
import { campaignToFields, createEmptyFields, getFieldByLabel } from "../lib/field-config";

interface GridWrapperProps {
  area: string;
}

function Wrapper() {
  const [isEditing, setEditing] = useState(false);
  const [isAdding, setAdding] = useState(false);
  const [formFields, setFormFields] = useState<Field[]>(createEmptyFields());
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});
  const { selectedCampaign, setSelectedCampaign, balance } =
    useCampaignStore();
  const {
    campaigns,
    addCampaign,
    updateCampaign,
    deleteCampaign,
    isLoading,
    error,
  } = useCampaigns();

  const handleSelectCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setFormFields(campaignToFields(campaign));
    setValidationErrors({});
    setEditing(false);
    setAdding(false);
  };

  const handleChange = (index: number, value: string) => {
    const newFields = [...formFields];
    newFields[index] = { ...newFields[index], value };
    setFormFields(newFields);
    if (validationErrors[newFields[index].label]) {
      const newErrors = { ...validationErrors };
      delete newErrors[newFields[index].label];
      setValidationErrors(newErrors);
    }
  };

  const onAddClick = () => {
    setAdding(true);
    setEditing(true);
    setSelectedCampaign(null);
    setFormFields(createEmptyFields());
    setValidationErrors({});
  };

  const validateFields = () => {
    const errors: { [key: string]: string } = {};
    const name = getFieldByLabel(formFields, "Campaign name:")?.value;
    const keywords = getFieldByLabel(formFields, "Keywords:")?.value;
    const bid = Number(getFieldByLabel(formFields, "Bid amount:")?.value || 0);
    const fund = Number(getFieldByLabel(formFields, "Campaign fund:")?.value || 0);
    const town = getFieldByLabel(formFields, "Town:")?.value;
    const radius = getFieldByLabel(formFields, "Radius:")?.value;
    const status = getFieldByLabel(formFields, "Status:")?.value;

    if (!name) errors["Campaign name:"] = "Name is required";
    if (!keywords) errors["Keywords:"] = "Keywords are required";
    if (bid <= 0) errors["Bid amount:"] = "Min bid > 0";
    if (fund <= 0) errors["Campaign fund:"] = "Fund must be > 0";
    if (!town) errors["Town:"] = "Town is required";
    if (!radius) errors["Radius:"] = "Radius is required";
    if (!status) errors["Status:"] = "Status is required";

    return errors;
  };

  const handleSave = () => {
    const errors = validateFields();

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const fund = Number(
      getFieldByLabel(formFields, "Campaign fund:")?.value || 0
    );

    if (isAdding) {
      if (fund > balance) {
        setValidationErrors({ "Campaign fund:": "Insufficient funds" });
        return;
      }

      addCampaignService(formFields, addCampaign, (newCampaign) => {
        setAdding(false);
        setEditing(false);
        handleSelectCampaign(newCampaign);
      });
    } else if (isEditing && selectedCampaign) {
      const currentCampaignFund = selectedCampaign.campaignFund;
      const fundDifference = fund - currentCampaignFund;

      if (fundDifference > balance) {
        setValidationErrors({ "Campaign fund:": "Insufficient funds" });
        return;
      }

      updateCampaignService(
        selectedCampaign,
        formFields,
        updateCampaign,
        (updatedCampaign) => {
          setSelectedCampaign(updatedCampaign);
          setEditing(false);
        }
      );
    }
  };

  const handleDelete = () => {
    deleteCampaignService(selectedCampaign, deleteCampaign, setSelectedCampaign);
  };

  if (isLoading) return <Message>Loading...</Message>;
  if (error) return <Message>Error: {error}</Message>;

  return (
    <Container>
      <GridWrapper area="list">
        <List onSelectCampaign={handleSelectCampaign} campaigns={campaigns} />
      </GridWrapper>
      <GridWrapper area="balance">
        <Balance />
      </GridWrapper>
      <GridWrapper area="card">
        {isAdding ? (
          <FormCard
            data={formFields}
            isEditing={isEditing}
            onChange={handleChange}
            validationErrors={validationErrors}
          />
        ) : (
          <Card.Wrapper
            isEditing={isEditing}
            selectedCampaign={selectedCampaign}
            data={formFields}
            onChange={handleChange}
            validationErrors={validationErrors}
          />
        )}
      </GridWrapper>
      <GridWrapper area="menu">
        <Menu
          isAdding={isAdding}
          setAdding={setAdding}
          isEditing={isEditing}
          setEditing={setEditing}
          hasSelection={!!selectedCampaign}
          onAdd={onAddClick}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      </GridWrapper>
    </Container>
  );
}

export default Wrapper;

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  column-gap: 0.2em;
  row-gap: 1em;
  width: 50em; 
  grid-template-areas:
    "list card"
    "balance menu";

  @media (max-width: 900px) {
    width: 90vw;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      "list"
      "balance"
      "card"
      "menu"
      ;
    row-gap: 1em;
    margin: 1em 0;
  }
`;

const GridWrapper = styled.div<GridWrapperProps>`
  grid-area: ${(props) => props.area};
  align-self: center;
  justify-self: ${(props) => (props.area === "balance" ? "end" : "stretch")};

  @media (max-width: 900px) {
    justify-self: ${(props) =>
    props.area === "list" || props.area === "balance" ? "center" : "stretch"};
  }
`;

const Message = styled.div`
  display:flex;
  align-items: center;
`;