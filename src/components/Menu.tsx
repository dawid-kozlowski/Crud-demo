import styled from "styled-components";

function Menu() {
  return (
    <View>
      <Button>
        <Icon className="material-symbols-outlined">add</Icon>Add
      </Button>
      <Button>
        <Icon className="material-symbols-outlined">edit</Icon>Edit
      </Button>
      <Button>
        <Icon className="material-symbols-outlined">delete</Icon>Delete
      </Button>
    </View>
  );
}
export default Menu;

const View = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 1em;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 2px;
  padding: 10px;
  color: var(--text-dark);
  transition: background-color 0.2s ease;
  background-color: var(--surface-light);
  border-radius: var(--radius-button);
  user-select: none;

  &:hover {
    cursor: pointer;
    background-color: var(--surface-light-hover);
  }
`;

const Icon = styled.span`
  font-size: var(--icon-size);
`;
