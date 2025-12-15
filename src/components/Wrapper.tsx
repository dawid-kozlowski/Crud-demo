import styled from "styled-components";
import Card from "./Card";
import List from "./List";
import Balance from "./Balance";
import Menu from "./Menu";

interface GridWrapperProps {
  area: string;
}

function Wrapper() {
  return (
    <Container>
      <GridWrapper area="list">
        <List />
      </GridWrapper>
      <GridWrapper area="balance">
        <Balance />
      </GridWrapper>
      <GridWrapper area="card">
        <Card.Wrapper />
      </GridWrapper>
      <GridWrapper area="menu">
        <Menu />
      </GridWrapper>
    </Container>
  );
}

export default Wrapper;

const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  column-gap: 0.5em;
  row-gap: 1em;
  grid-template-areas:
    "list card"
    "balance menu";
`;

const GridWrapper = styled.div<GridWrapperProps>`
  grid-area: ${(props) => props.area};
  align-self: center;
`;
