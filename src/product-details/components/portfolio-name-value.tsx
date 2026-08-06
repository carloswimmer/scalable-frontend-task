import { KeyboardEvent, useEffect, useRef, useState, TransitionEvent } from "react";
import { Pencil as EditIcon } from "../../assets/Pencil";
import styled from "styled-components";
import { Save as SaveIcon } from "../../assets/Save";
import { Cancel as CancelIcon } from "../../assets/Cancel";

const personalizations = { name: "Broker Portfolio" };

export const PortfolioNameValue: React.FunctionComponent = () => {
  const [name, setName] = useState(personalizations.name)
  const [isEditing, setIsEditing] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isExpanded) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [isExpanded])

  const openEdit = () => {
    setIsEditing(true)
    requestAnimationFrame(() => {
      setIsExpanded(true)
    })
  }

  const handleTransitionEnd = (e: TransitionEvent) => {
    if (e.propertyName === 'max-width' && !isExpanded) {
      setIsEditing(false)
    }
  }

  const handleSaveName = () => {
    const newName = inputRef.current?.value.trim()
    
    if (newName && newName !== name) {
      setName(newName)
    }
      
    setIsExpanded(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveName()
    }

    if (e.key === 'Escape') {
      setIsExpanded(false)
    }
  }

  return (
    <EditBlock>
      {isEditing ? (
        <>
          <InputWrapper $expanded={isExpanded} onTransitionEnd={handleTransitionEnd}>
            <Input 
              ref={inputRef} 
              defaultValue={name} 
              onKeyDown={handleKeyDown}
              aria-label="Portfolio name"
            />
          </InputWrapper>
          <SaveButton $visible={isExpanded} onClick={handleSaveName} aria-label="Save portfolio name">
            <SaveIcon />
          </SaveButton>
          <CancelButton $visible={isExpanded} onClick={() => setIsExpanded(false)} aria-label="Cancel editing portfolio name">
            <CancelIcon />
          </CancelButton>
        </>
      ) : (
        <>
          <span>{name}</span>
          <Button onClick={openEdit} aria-label="Edit portfolio name"><EditIcon /></Button>
        </>
      )}
    </EditBlock>
  )
}

const EditBlock = styled.div`
  display: flex;
  gap:calc(var(--spacing) * 1.5);
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`

const Button = styled.button<{ $visible?: boolean }>`
  color: var(--white-60);
  background: transparent;
  border: none;
  cursor: pointer;
  pointer-events: ${({ $visible = true }) => ($visible ? 'auto' : 'none')};
  opacity: ${({ $visible = true }) => ($visible ? 1 : 0)};
  transition: opacity 0.2s ease;

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
  width: 100%;
  padding-block: calc(var(--spacing) * 0.75);
  padding-inline: calc(var(--spacing) * 1.5);
  border: none;
  border-radius: var(--spacing);
`

const InputWrapper = styled.div<{ $expanded: boolean }>`
  flex: 1;
  overflow: hidden;
  max-width: ${({ $expanded }) => ($expanded ? '700px' : '0')};
  opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
  transition: max-width 0.3s ease, opacity 0.2s ease;
`