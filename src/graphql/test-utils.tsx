import React, { ReactElement } from "react";
import { ApolloProvider } from "@apollo/client";
import { render, RenderOptions } from "@testing-library/react";
import { createApolloClient } from "./client";

export function createWrapper() {
  const client = createApolloClient();
  return function ApolloWrapper({ children }: { children: React.ReactNode }) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
  };
}

export function renderWithApollo(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  return render(ui, { wrapper: createWrapper(), ...options });
}