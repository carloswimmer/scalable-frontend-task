import React from "react";
import styled from "styled-components";
import { SecuritiesAccount } from "./securities-account";
import { CashAccount } from "./cash-account";
import { PortfolioName } from "./portfolio-name";

const Header = styled.div`
  margin-top: calc(var(--spacing) * 5);
  margin-bottom: calc(var(--spacing) * 5);
  min-height: 64px;
  display: flex;
  align-items: center;
  gap: calc(var(--spacing) * 2);
  color: var(--white);

  & h1 {
    color: inherit;
  }
`;

const BackButton = styled.a`
  color: var(--white);
  width: calc(var(--spacing) * 3);
  height: calc(var(--spacing) * 3);
  outline-offset: 2px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus-visible {
    outline: 2px solid transparent;
    box-shadow: 0px 0px 0px 1px var(--woodsmoke), 0px 0px 0px 3px var(--white);
  }
`;

const MainSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: calc(var(--spacing) * 4);
`;

export default function ProductDetails() {
  return (
    <div>
      <Header>
        <BackButton href="/" aria-label={"Go Back"}>
          {"<"}
        </BackButton>
        <h1>{"Product Details"}</h1>
      </Header>
      <MainSection>
        <div>
          <PortfolioName />
          <CashAccount />
          <SecuritiesAccount />
        </div>
      </MainSection>
    </div>
  );
}
