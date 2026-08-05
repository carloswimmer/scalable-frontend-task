import React from "react";
import styled from "styled-components";
import { Row } from "../../components/Rows";
import { List } from "../../components/Lists";

export const PortfolioName: React.FunctionComponent = () => {
  const personalizations = { name: "Broker Portfolio" };

  return (
    <>
      <List.Root>
        <List.Item>
          <Row.Content>
            <Row.Label>{"Portfolio name"}</Row.Label>
            <Row.Value>{personalizations.name}</Row.Value>
          </Row.Content>
        </List.Item>
      </List.Root>
    </>
  );
};
