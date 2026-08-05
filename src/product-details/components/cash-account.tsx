import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Row } from "../../components/Row";
import { List } from "../../components/List";

const Header2 = styled.h2`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semi-bold);
  color: var(--white-60);
  margin-bottom: calc(var(--spacing) * 2);
  margin-top: calc(var(--spacing) * 3);
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
      <List.Root aria-labelledby={"cash-account"}>
        <List.Item>
          <Row.Content>
            <Row.Label>{"IBAN"}</Row.Label>
            <Row.Value>{iban}</Row.Value>
          </Row.Content>
        </List.Item>
        <List.Item>
          <Row.Content>
            <Row.Label>{"BIC"}</Row.Label>
            <Row.Value>{bic}</Row.Value>
          </Row.Content>
        </List.Item>
        {allOnboardingStepsCompleted && (
          <List.Item>
            <ClickableRowContent>
              <a
                href={`/cockpit/cash-allocation?portfolioId=${portfolioId}`}
                target="_blank"
                rel="noreferrer"
              >
                {"Cash Balance Allocation"}
              </a>
            </ClickableRowContent>
          </List.Item>
        )}
      </List.Root>
    </>
  );
};
