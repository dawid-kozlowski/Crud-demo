import styled from "styled-components";

const mock = [
  { label: "Campaign name:", value: "Somename" },
  {
    label: "Keywords:",
    value: "nice, epic, amazing, incredible",
  },
  { label: "Bid amount:", value: "$125.56" },
  { label: "Campaign fund:", value: "$5000" },
  { label: "Status:", value: "Active" },
  { label: "Town:", value: "Cracow" },
  { label: "Radius:", value: "55km" },
];

const Card = {
  Display: function DisplayCard() {
    return (
      <View>
        <Container>
          {mock.map((item) => (
            <TextContainer key={item.label}>
              <Text>{item.label}</Text>
              <Text style={{ textAlign: "right" }} key={item.value}>
                {item.value}
              </Text>
            </TextContainer>
          ))}
        </Container>
      </View>
    );
  },
  Edit: function EditCard() {
    return (
      <View>
        <Container>
          {mock.map((item) => (
            <TextContainer key={item.label}>
              <Text>{item.label}</Text>
              {item.label === "Town:" ? (
                <Select>
                  <option>Cracow</option>
                  <option>Warsaw</option>
                </Select>
              ) : (
                <Text style={{ textAlign: "right" }} key={item.value}>
                  {item.value}
                </Text>
              )}
            </TextContainer>
          ))}
        </Container>
      </View>
    );
  },
  Wrapper: function WrapperCard() {
    return <Card.Display />;
  },
};

export default Card;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--surface);
  border-radius: var(--radius);
  border: 1px solid var(--border);
  padding: 0.5em 1em;
`;

const TextContainer = styled.div`
  display: flex;
  gap: 6em;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-muted);

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const Text = styled.p`
  align-self: center;
  margin: 0;
  padding: 1em 0;
  max-width: 10rem;
  overflow-wrap: break-word;
`;

const View = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const Select = styled.select`
  border: none;
  color: var(--text);
  background-color: var(--surface);
  font-weight: bold;
`;
