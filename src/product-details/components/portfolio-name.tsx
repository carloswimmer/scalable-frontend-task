import React from "react";
import { Row } from "../../components/row";
import { List } from "../../components/list";
import { PortfolioNameValue } from "./portfolio-name-value";

export const PortfolioName: React.FunctionComponent = () => {
  const personalizations = { name: "Broker Portfolio" };

  return (
    <>
      <List.Root>
        <List.Item>
          <Row.Content>
            <Row.Label>Portfolio name</Row.Label>
            <Row.Value>
              <PortfolioNameValue initialState={personalizations.name} />
            </Row.Value>
          </Row.Content>
        </List.Item>
      </List.Root>
    </>
  );
};
