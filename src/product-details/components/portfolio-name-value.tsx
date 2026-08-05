import { useRef, useState } from "react";
import { Pencil } from "../../assets/Pencil";
import styled from "styled-components";
import { Save } from "../../assets/Save";
import { Cancel } from "../../assets/Cancel";

const personalizations = { name: "Broker Portfolio" };

const EditBlock = styled.div`
  display: flex;
  gap:calc(var(--spacing) * 1.5);
  align-items: center;
  justify-content: flex-end;
  width: stretch;
`

const Button = styled.button`
  color: var(--white-60);
  background: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    color: var(--white-80);
  }
`

const SaveButton = styled(Button)`
  color: var(--emerald-80);

  &:hover {
    color: var(--emerald);
  }
`

const CancelButton = styled(Button)`
  color: var(--blush-80);

  &:hover {
    color: var(--blush);
  }
`

const Input = styled.input`
  width: stretch;
  padding-block: calc(var(--spacing) * 0.75);
  padding-inline: calc(var(--spacing) * 1.5);
  border: none;
  border-radius: var(--spacing);
`

export const PortfolioNameValue: React.FunctionComponent = () => {
  const [name, setName] = useState(personalizations.name)
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSaveName = () => {
    const newName = inputRef.current?.value.trim()
    
    if (newName && newName !== name) {
      setName(newName)
    }
      
    setIsEditing(false)
  }

  return (
    <EditBlock>
      {isEditing ? (
        <>
        <Input ref={inputRef} defaultValue={name} />
        <SaveButton onClick={handleSaveName}><Save /></SaveButton>
        <CancelButton onClick={() => setIsEditing(false)}><Cancel /></CancelButton>
      </>
      ) : (
        
        <>
        <span>{name}</span>
        <Button onClick={() => setIsEditing(true)}><Pencil /></Button>
      </>
      )}
    </EditBlock>
  )
}