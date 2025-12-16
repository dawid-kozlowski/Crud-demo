import styled, { keyframes } from "styled-components";
import { useCampaignStore } from "../stores/useCampaignStore";
import { useEffect, useState } from "react";

function Balance() {
  const { balance } = useCampaignStore();
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const flashTimer = setTimeout(() => setFlash(true), 0);
    const resetTimer = setTimeout(() => setFlash(false), 500);
    return () => {
      clearTimeout(flashTimer);
      clearTimeout(resetTimer);
    };
  }, [balance]);

  return (
    <View className={flash ? "flash" : ""}>
      <Icon className="material-symbols-outlined">diamond</Icon>
      <Text>{balance}</Text>
    </View>
  );
}

export default Balance;

const flashAnimation = keyframes`
  0% { transform: scale(1); color: var(--balance); }
  50% { transform: scale(1.1); color: white; text-shadow: 0 0 20px white; }
  100% { transform: scale(1); color: var(--balance); }
`;

const View = styled.div`
  display: flex;
  padding-right: 2em;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 4px;
  text-shadow: 0 0 10px var(--balance);
  transition: all 0.3s ease;
  color: var(--balance);

  &.flash {
    animation: ${flashAnimation} 0.5s ease-in-out;
  }
`;

const Icon = styled.span`
  font-size: var(--icon-size);
  color: inherit;
`;

const Text = styled.p`
  margin: 0;
  color: inherit;
  align-self: center;
`;
