import React from "react";
import { Row } from "../../components/Row";
import { List } from "../../components/List";
import { PortfolioNameValue } from "./portfolio-name-value";

export const PortfolioName: React.FunctionComponent = () => {
  return (
    <>
      <List.Root>
        <List.Item>
          <Row.Content>
            <Row.Label>Portfolio name</Row.Label>
            <Row.Value><PortfolioNameValue /></Row.Value>
          </Row.Content>
        </List.Item>
      </List.Root>
    </>
  );
};
