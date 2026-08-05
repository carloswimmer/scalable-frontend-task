import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Header2 = styled.h2`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semi-bold);
  color: var(--white-60);
  margin-bottom: calc(var(--spacing) * 2);
  margin-top: calc(var(--spacing) * 3);
`;

const List = styled.ol`
  list-style: none;

  & li + li {
    border-top: 1px solid var(--white-5, rgba(255, 255, 255, 0.05));
  }

  & li:first-child {
    border-top-left-radius: calc(var(--spacing) * 1);
    border-top-right-radius: calc(var(--spacing) * 1);
  }
  & li:last-child {
    border-bottom-left-radius: calc(var(--spacing) * 1);
    border-bottom-right-radius: calc(var(--spacing) * 1);
  }
`;

const ListItem = styled.li`
  display: flex;
  height: 57px;
  min-height: 57px;
  padding: 0 calc(var(--spacing) * 2);
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  background: var(--Greys-Positive-Jet, #191a1c);
`;

const RowContent = styled.div`
  display: flex;
  padding: 16px 0;
  align-items: center;
  gap: 8px;
  flex: 1 0 0;
  align-self: stretch;
  font-size: var(--font-size-sm);
`;

const ClickableRowContent = styled.div`
  display: flex;
  padding: 16px 0;
  align-items: center;
  gap: 8px;
  flex: 1 0 0;
  align-self: stretch;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semi-bold);
`;

const RowLabel = styled.span`
  color: var(--White-60, rgba(255, 255, 255, 0.6));
  font-style: normal;
  font-weight: var(--font-weight-normal);
  line-height: normal;
`;

const RowValue = styled.span`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: calc(var(--spacing) * 0.5);
  flex: 1 0 0;
  font-weight: var(--font-weight-semi-bold);
  color: var(--white);
  line-height: 20px;
  letter-spacing: 0.15px;
`;

const portfolioId = "oCt4GtuDS2YjimboYTBfNu";
export const CashAccount: FunctionComponent = () => {
  const data = {
    portfolio: {
      cashAccount: {
        iban: "DE89370400440532013000",
        bic: "COBADEFFXXX",
      },
      postOnboardingInfo: {
        id: "PostOnboardingInfo-oCt4GtuDS2YjimboYTBfNu",
        allStepsCompleted: true,
      },
    },
  };

  const { iban, bic } = data?.portfolio?.cashAccount ?? {};
  const allOnboardingStepsCompleted =
    data?.portfolio?.postOnboardingInfo?.allStepsCompleted;

  return (
    <>
      <Header2 id="cash-account">{"Cash account"}</Header2>
      <List aria-labelledby={"cash-account"}>
        <ListItem>
          <RowContent>
            <RowLabel>{"IBAN"}</RowLabel>
            <RowValue>{iban}</RowValue>
          </RowContent>
        </ListItem>
        <ListItem>
          <RowContent>
            <RowLabel>{"BIC"}</RowLabel>
            <RowValue>{bic}</RowValue>
          </RowContent>
        </ListItem>
        {allOnboardingStepsCompleted && (
          <ListItem>
            <ClickableRowContent>
              <a
                href={`/cockpit/cash-allocation?portfolioId=${portfolioId}`}
                target="_blank"
                rel="noreferrer"
              >
                {"Cash Balance Allocation"}
              </a>
            </ClickableRowContent>
          </ListItem>
        )}
      </List>
    </>
  );
};
