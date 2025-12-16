import styled from "styled-components";
import { useState } from "react";
import { Container, TextContainer, Text, View } from "./Card";
import { KEYWORD_SUGGESTIONS, TOWN_OPTIONS } from "../lib/constants";
import type { Field } from "../types";
import { parseKeywords } from "../lib/utils";

export type { Field } from "../types";

type FormCardProps = {
  data: Field[];
  isEditing?: boolean;
  onChange: (index: number, value: string) => void;
  validationErrors?: { [key: string]: string };
};

function FormCard({
  data,
  isEditing,
  onChange,
  validationErrors,
}: FormCardProps) {
  const [keywordWarning, setKeywordWarning] = useState<string | null>(null);

  const handleAddKeyword = (
    index: number,
    currentValue: string,
    newValue: string,
    onChange: (index: number, value: string) => void
  ) => {
    const val = newValue.trim();
    if (val) {
      const currentKeywords = parseKeywords(currentValue);

      if (currentKeywords.length >= 4) {
        setKeywordWarning("Max 4 keywords");
        return true;
      }

      if (!currentKeywords.includes(val)) {
        onChange(index, [...currentKeywords, val].join(", "));
        return true;
      }
    }
    return false;
  };

  const handleRemoveKeyword = (
    index: number,
    currentValue: string,
    keywordToRemove: string,
    onChange: (index: number, value: string) => void
  ) => {
    const currentKeywords = parseKeywords(currentValue);
    const newKeywords = currentKeywords.filter((k) => k !== keywordToRemove);
    onChange(index, newKeywords.join(", "));
    if (newKeywords.length < 4) {
      setKeywordWarning(null);
    }
  };

  return (
    <View>
      <Container>
        <form>
          {data.map((item, index) => (
            <TextContainer key={item.label} style={{ position: "relative" }}>
              <LabelContainer>
                <Text style={{ fontWeight: "bold", alignSelf: "flex-start" }}>
                  {item.label}
                </Text>
                {validationErrors && validationErrors[item.label] && (
                  <ErrorMessage>{validationErrors[item.label]}</ErrorMessage>
                )}
                {item.label === "Keywords:" && keywordWarning && (
                  <ErrorMessage>{keywordWarning}</ErrorMessage>
                )}
              </LabelContainer>

              {item.type === "checkbox" ? (
                <CheckboxWrapper
                  onClick={() =>
                    onChange(
                      index,
                      item.value === "Active" ? "Inactive" : "Active"
                    )
                  }
                >
                  <Text>{item.value}</Text>
                  <Checkbox className="material-symbols-outlined">
                    {item.value === "Active"
                      ? "check_box"
                      : "check_box_outline_blank"}
                  </Checkbox>
                </CheckboxWrapper>
              ) : item.type === "select" ? (
                <select
                  value={item.value}
                  onChange={(e) => onChange(index, e.target.value)}
                >
                  <option value="">Select a town</option>
                  {TOWN_OPTIONS.map((town) => (
                    <option key={town} value={town}>
                      {town}
                    </option>
                  ))}
                </select>
              ) : item.label === "Keywords:" ? (
                <ChipContainer>
                  {parseKeywords(item.value).map((keyword) => (
                    <Chip key={keyword}>
                      {keyword}
                      <span
                        onClick={() =>
                          handleRemoveKeyword(
                            index,
                            item.value,
                            keyword,
                            onChange
                          )
                        }
                      >
                        &times;
                      </span>
                    </Chip>
                  ))}
                  <Input
                    placeholder="Add..."
                    $isEditing={isEditing}
                    list="keywords-list"
                    style={{ width: "5em", textAlign: "right" }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (
                          handleAddKeyword(
                            index,
                            item.value,
                            e.currentTarget.value,
                            onChange
                          )
                        ) {
                          e.currentTarget.value = "";
                        }
                      }
                    }}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (KEYWORD_SUGGESTIONS.includes(val)) {
                        if (
                          handleAddKeyword(index, item.value, val, onChange)
                        ) {
                          e.target.value = "";
                        }
                      }
                    }}
                  />
                  <datalist id="keywords-list">
                    {KEYWORD_SUGGESTIONS.filter((k) => {
                      const current = parseKeywords(item.value);
                      return !current.includes(k);
                    }).map((k) => (
                      <option key={k} value={k} />
                    ))}
                  </datalist>
                </ChipContainer>
              ) : item.label === "Bid amount:" ||
                item.label === "Campaign fund:" ||
                item.label === "Radius:" ? (
                <Input
                  type="number"
                  value={item.value}
                  onChange={(e) => onChange(index, e.target.value)}
                  onKeyDown={(e) => {
                    if (
                      e.key === "e" ||
                      e.key === "E" ||
                      e.key === "-" ||
                      e.key === "+"
                    ) {
                      e.preventDefault();
                    }
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.value = target.value.replace(/[^0-9]/g, "");
                  }}
                  $isEditing={isEditing}
                  placeholder={item.placeholder}
                  min="0"
                  step="1"
                />
              ) : (
                <Input
                  value={item.value}
                  onChange={(e) => onChange(index, e.target.value)}
                  $isEditing={isEditing}
                  placeholder={item.placeholder}
                />
              )}
            </TextContainer>
          ))}
        </form>
      </Container>
    </View>
  );
}

export default FormCard;

const Input = styled.input<{ $isEditing?: boolean }>`
  text-align: right;
  width: 16em;
  border: none;
  background: transparent;
  color: ${(props) => (props.$isEditing ? "var(--text-muted)" : "var(--text)")};
  transition: color 0.2s ease;
  padding: 1em 0;

  &::placeholder {
    color: var(--text-muted);
    transition: color 0.2s ease;
  }

  &:focus {
    outline: none;
  }
  &:hover {
    color: ${(props) =>
    props.$isEditing ? "var(--text)" : "var(--text-muted"};
  }
  &:hover::placeholder {
    color: ${(props) =>
    props.$isEditing ? "var(--text)" : "var(--text-muted"};
  }

  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

const Checkbox = styled.div`
  font-size: var(--icon-size);
  align-self: center;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  cursor: pointer;

  div,
  p {
    color: var(--text-muted);
    transition: color 0.2s ease;
  }

  &:hover div,
  &:hover p {
    color: var(--text);
  }
`;

const ErrorMessage = styled.span`
  color: var(--text-muted);
  font-size: 0.8em;
  font-weight: normal;
  white-space: nowrap;
  margin-top: 0;
  margin-bottom: 0.5em;
`;

const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.2em;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  max-height: 4em;
  overflow-y: auto;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--border);
    border-radius: 4px;
  }
`;

const Chip = styled.div`
  background-color: var(--surface-light);
  color: var(--background);
  border-radius: 999px;
  padding: 0.1em 0.5em;
  display: flex;
  align-items: center;
  gap: 0.2em;
  font-size: 0.8em;
  white-space: nowrap;

  span {
    cursor: pointer;
    font-size: 1.2em;
    font-weight: bold;
    &:hover {
      color: var(--error);
    }
  }
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
