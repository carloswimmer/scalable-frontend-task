import styled from 'styled-components'

const RowContent = styled.div`
  display: flex;
  padding-block: calc(var(--spacing) * 1.5);
  align-items: center;
  gap: calc(var(--spacing) * 2);
  flex: 1 0 0;
  align-self: stretch;
  font-size: var(--font-size-sm);
`

const RowLinkContent = styled(RowContent)`
  padding-block: calc(var(--spacing) * 2);
  gap: var(--spacing);
  font-weight: var(--font-weight-semi-bold);
`

const RowLabel = styled.span`
  color: var(--white-60);
  font-style: normal;
  font-weight: var(--font-weight-normal);
  line-height: normal;
`

const RowValue = styled.span`
  align-self: stretch;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: calc(var(--spacing) * 0.5);
  flex: 1 0 0;
  width: stretch;
  font-weight: var(--font-weight-semi-bold);
  color: var(--white);
  line-height: var(--line-height-row-value);
  letter-spacing: var(--letter-spacing-row-value);
`

export const Row = {
  Content: RowContent,
  LinkContent: RowLinkContent,
  Label: RowLabel,
  Value: RowValue,
}
