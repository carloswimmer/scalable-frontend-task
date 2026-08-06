import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Pencil as EditIcon } from "../../assets/Pencil";
import styled from "styled-components";
import { Save as SaveIcon } from "../../assets/Save";
import { Cancel as CancelIcon } from "../../assets/Cancel";

interface PortfolioNameValueProps {
  initialState: string,
}

export const PortfolioNameValue = ({ initialState }: PortfolioNameValueProps) => {
  const [name, setName] = useState(initialState)
  const [isEditing, setIsEditing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [isEditing])

  const openEdit = () => {
    if (inputRef.current) {
      inputRef.current.value = name
    }
    setIsEditing(true)
  }

  const closeEdit = () => {
    if (inputRef.current) {
      inputRef.current.value = name
    }
    setIsEditing(false)
    setErrorMessage('')
  }

  const handleSaveName = () => {
    const newName = inputRef.current?.value.trim()

    if (!newName || newName.length < 3) {
      setErrorMessage('Minimum of 3 characters')
      return
    }

    if (newName.length > 50) {
      setErrorMessage('Maximum of 50 characters')
      return
    }

    if (newName !== name) {
      setName(newName)
    }

    setIsEditing(false)
    setErrorMessage('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveName()
    }

    if (e.key === 'Escape') {
      closeEdit()
    }
  }

  return (
    <EditBlock>
      <ContentSlot>
        <NameText $visible={!isEditing} aria-hidden={isEditing}>
          <span>{name}</span>
        </NameText>

        <InputWrapper $expanded={isEditing}>
          <Input
            ref={inputRef}
            defaultValue={name}
            onKeyDown={handleKeyDown}
            tabIndex={isEditing ? 0 : -1}
            aria-hidden={!isEditing}
            aria-label="Portfolio name"
            aria-invalid={!!errorMessage}
            aria-describedby={errorMessage ? 'portfolio-name-error' : undefined}
          />
          {errorMessage && (
            <ErrorMessage id="portfolio-name-error" role="alert">
              {errorMessage}
            </ErrorMessage>
          )}
        </InputWrapper>
      </ContentSlot>

      <ActionsSlot>
        <ActionGroup $visible={!isEditing} aria-hidden={isEditing}>
          <div>
            <EditButton 
              type="button"
              onClick={openEdit} 
              tabIndex={isEditing ? -1 : 0}
              aria-label="Edit portfolio name"
            >
              <EditIcon />
            </EditButton>
          </div>
        </ActionGroup>

        <ActionGroup $visible={isEditing} aria-hidden={!isEditing}>
          <div>
            <SaveButton 
              type="button"
              onClick={handleSaveName} 
              tabIndex={isEditing ? 0 : -1} 
              aria-label="Save portfolio name"
            >
              <SaveIcon />
            </SaveButton>
            <CancelButton 
              type="button"
              onClick={closeEdit} 
              tabIndex={isEditing ? 0 : -1}
              aria-label="Cancel editing portfolio name"
            >
              <CancelIcon />
            </CancelButton>
          </div>
        </ActionGroup>
      </ActionsSlot>
    </EditBlock>
  )
}

const EditBlock = styled.div`
  display: flex;
  gap: calc(var(--spacing) * 1.5);
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`

const ContentSlot = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
  justify-content: flex-end;
  align-items: center;
`

const ActionsSlot = styled.div`
  display: flex;
  align-items: center;
`

const gridCollapsibleInner = `
  min-width: 0;
  overflow: hidden;
`

const NameText = styled.span<{ $visible: boolean }>`
  display: grid;
  grid-template-columns: ${({ $visible }) => ($visible ? '1fr' : '0fr')};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: grid-template-columns 0.3s ease, opacity 0.2s ease;
  overflow: hidden;

  & > span {
    ${gridCollapsibleInner}
    white-space: nowrap;
  }
`

const ActionGroup = styled.div<{ $visible: boolean }>`
  display: grid;
  grid-template-columns: ${({ $visible }) => ($visible ? '1fr' : '0fr')};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  transition: grid-template-columns 0.3s ease, opacity 0.3s ease;
  overflow: hidden;

  & > div {
    display: flex;
    gap: calc(var(--spacing) * 1.5);
    align-items: center;
    ${gridCollapsibleInner}
  }
`

const Button = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
`

const EditButton = styled(Button)`
  color: var(--white-60);

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
  min-width: 0;
  overflow: hidden;
  width: 100%;
  padding-block: calc(var(--spacing) * 0.75);
  padding-inline: calc(var(--spacing) * 1.5);
  border: none;
  border-radius: var(--spacing);
`

const InputWrapper = styled.div<{ $expanded: boolean }>`
  flex: 1;
  min-width: 0;
  max-width: ${({ $expanded }) => ($expanded ? '100%' : '0')};
  opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
  transition: max-width 0.3s ease, opacity 0.2s ease;
  overflow: hidden;
`

const ErrorMessage = styled.p`
  color: var(--blush);
  font-weight: var(--font-weight-normal);
  padding-top: calc(var(--spacing) * 0.5);
  padding-inline: calc(var(--spacing) * 1.5);
`
