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

export const SecuritiesAccount: FunctionComponent = () => {
  const data = {
    portfolio: {
      securitiesAccountNumber: "5134823356",
      custodianBankBIC: "SCABDEMMXXX",
    },
  };

  const { securitiesAccountNumber, custodianBankBIC } = data?.portfolio ?? {};

  return (
    <>
      <Header2 id={"Securities Account"}>{"Securities account"}</Header2>
      <List.Root aria-labelledby={"Securities Account"}>
        <List.Item>
          <Row.Content>
            <Row.Label>{"Account number"}</Row.Label>
            <Row.Value>{securitiesAccountNumber}</Row.Value>
          </Row.Content>
        </List.Item>
        <List.Item>
          <Row.Content>
            <Row.Label>{"BIC"}</Row.Label>
            <Row.Value>{custodianBankBIC}</Row.Value>
          </Row.Content>
        </List.Item>
      </List.Root>
    </>
  );
};
