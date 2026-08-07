import React, { useState } from "react";
import { Row } from "../../components/row";
import { List } from "../../components/list";
import { PortfolioNameValue } from "./portfolio-name-value";

interface Personalizations {
  name: string
}

export const PortfolioName: React.FunctionComponent = () => {
  const personalizations = { name: "Broker Portfolio" };
  const [personalizationsState, setPersonalizationsState] = useState<Personalizations>(personalizations)

  console.log('State saved locally:', personalizationsState)

  const handleSave = (newName: string) => {
    setPersonalizationsState({ name: newName })
  }

  return (
    <>
      <List.Root>
        <List.Item>
          <Row.Content>
            <Row.Label>Portfolio name</Row.Label>
            <Row.Value>
              <PortfolioNameValue initialState={personalizations.name} onSave={handleSave} />
            </Row.Value>
          </Row.Content>
        </List.Item>
      </List.Root>
    </>
  );
};
