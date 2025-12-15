import styled from "styled-components";

const mock = [
  "Lantern",
  "Echo",
  "Drift",
  "Marble",
  "Horizon",
  "Pixel",
  "Orbit",
  "Velvet",
  "Compdsadasdasdasdadasdsaass",
  "Glacier",
  "Ember",
  "Meadow",
  "Circuit",
  "Ripple",
  "Atlas",
  "Nimbus",
  "Harbor",
  "Quartz",
  "Solstice",
  "Willow",
];

function List() {
  return (
    <View>
      {mock.map((item) => (
        <Text>{item}</Text>
      ))}
    </View>
  );
}

export default List;

const View = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 25em;
  max-width: 5em;
  overflow-wrap: break-word;
  overflow: auto;
  direction: rtl;
  padding: 0 1em;
`;

const Text = styled.p`
  color: var(--text-muted);
  transition: color 0.2s ease;

  &:hover {
    cursor: pointer;
    color: var(--text);
  }
`;
