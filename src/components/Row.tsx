import styled from "styled-components";

const RowContent = styled.div`
  display: flex;
  padding: 16px 0;
  align-items: center;
  gap: calc(var(--spacing) * 2);
  flex: 1 0 0;
  align-self: stretch;
  font-size: var(--font-size-sm);
`;

const RowLabel = styled.span`
  color: var(--White-60, rgba(255, 255, 255, 0.6));
  font-style: normal;
  font-weight: var(--font-weight-normal);
  line-height: normal;
`;

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
  line-height: 20px;
  letter-spacing: 0.15px;
`;


export const Row = {
  Content: RowContent,
  Label: RowLabel,
  Value: RowValue,
}