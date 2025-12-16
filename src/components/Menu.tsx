import styled from "styled-components";

type MenuProps = {
  isEditing: boolean;
  isAdding: boolean;
  hasSelection: boolean;
  setAdding: (value: boolean) => void;
  setEditing: (value: boolean) => void;
  onAdd?: () => void;
  onSave: () => void;
  onDelete: () => void;
};

function Menu({
  isAdding,
  isEditing,
  hasSelection,
  setAdding,
  setEditing,
  onAdd,
  onSave,
  onDelete,
}: MenuProps) {
  const showCancel = isAdding || isEditing;
  const showSave = isEditing || isAdding;

  return (
    <View>
      {!isAdding && !isEditing && (
        <Button onClick={onAdd}>
          <Icon className="material-symbols-outlined">add</Icon>Add
        </Button>
      )}

      {showCancel && (
        <Button
          onClick={() => {
            setAdding(false);
            setEditing(false);
          }}
        >
          <Icon className="material-symbols-outlined">close</Icon>Cancel
        </Button>
      )}

      <Button
        disabled={!showSave && !hasSelection}
        onClick={() => {
          if (showSave) {
            onSave();
          } else {
            setEditing(true);
          }
        }}
      >
        <Icon className="material-symbols-outlined">
          {showSave ? "save" : "edit"}
        </Icon>
        {showSave ? "Save" : "Edit"}
      </Button>

      <Button onClick={onDelete} disabled={!hasSelection || isAdding}>
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

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 2px;
  padding: 10px;
  color: var(--text-dark);
  transition: all 0.1s ease;
  background-color: var(--surface-light);
  border-radius: var(--radius-button);
  user-select: none;

  &:hover {
    cursor: pointer;
    background-color: var(--surface-light-hover);
  }

  &:active:not(:disabled) {
    transform: scale(0.96);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: var(--surface-light);
    color: var(--text-muted);
  }
`;

const Icon = styled.span`
  font-size: var(--icon-size);
`;
