import { useRef, useEffect } from "react";
import styled from "styled-components";
import { type Campaign } from "../hooks/useCampaigns";
import { useCampaignStore } from "../stores/useCampaignStore";

type ListProps = {
  campaigns: Campaign[];
  onSelectCampaign?: (campaign: Campaign) => void;
};

function List({ onSelectCampaign, campaigns }: ListProps) {
  const { setSelectedCampaign, selectedCampaign } = useCampaignStore();
  const itemRefs = useRef<Map<string, HTMLParagraphElement>>(null);

  function getMap() {
    if (!itemRefs.current) {
      itemRefs.current = new Map();
    }
    return itemRefs.current;
  }

  const viewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewRef.current) {
      const element = viewRef.current;
      element.scrollTop = element.scrollHeight;

      const duration = 2000;
      const start = element.scrollTop;
      const startTime = performance.now();

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);

        element.scrollTop = start - start * ease;

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  }, []);

  useEffect(() => {
    if (selectedCampaign) {
      const node = getMap().get(selectedCampaign.id);
      if (node) {
        node.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [selectedCampaign]);

  return (
    <View ref={viewRef}>
      {campaigns.map((campaign) => (
        <Text
          key={campaign.id}
          ref={(node) => {
            const map = getMap();
            if (node) {
              map.set(campaign.id, node);
            } else {
              map.delete(campaign.id);
            }
          }}
          onClick={() =>
            onSelectCampaign
              ? onSelectCampaign(campaign)
              : setSelectedCampaign(campaign)
          }
          className={selectedCampaign?.id === campaign.id ? "selected" : ""}
        >
          {campaign.campaignName}
        </Text>
      ))}
    </View>
  );
}

export default List;

const View = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8em;
  max-width: 10em;
  max-height: 28em;
  overflow-wrap: break-word;
  overflow: auto;
  direction: rtl;
  padding: 0 0.8em;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--surface-light);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: var(--surface-light-hover);
  }
`;

const Text = styled.p`
  color: var(--text-muted);
  transition: all 0.1s ease;
  padding: 0.2em 0;
  margin: 0;

  &:hover {
    cursor: pointer;
    color: var(--text);
    transform: translateX(4px);
  }

  &.selected {
    color: var(--text);
    font-weight: bold;
    transform: translateX(4px);
  }

  &:active {
    transform: scale(0.98) translateX(4px);
    color: var(--text);
  }
`;
