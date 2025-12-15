import styled from "styled-components";

function Balance() {
  return (
    <View>
      <Icon className="material-symbols-outlined">diamond</Icon>
      <Text>56723</Text>
    </View>
  );
}

export default Balance;

const View = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 4px;
  text-shadow: 0 0 10px var(--balance);
`;

const Icon = styled.span`
  font-size: var(--icon-size);
  color: var(--balance);
`;

const Text = styled.p`
  margin: 0;
  color: var(--balance);
  align-self: center;
`;
