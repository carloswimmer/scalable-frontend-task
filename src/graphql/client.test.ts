import { ApolloClient } from "@apollo/client";
import { createApolloClient } from "./client";

describe("createApolloClient", () => {
  it("returns an ApolloClient", () => {
    expect(createApolloClient()).toBeInstanceOf(ApolloClient);
  });

  it("throws when REACT_APP_GRAPHQL_BASE_URL is missing", () => {
    const original = process.env.REACT_APP_GRAPHQL_BASE_URL;
    delete process.env.REACT_APP_GRAPHQL_BASE_URL;

    expect(() => createApolloClient()).toThrow(
      "REACT_APP_GRAPHQL_BASE_URL is not set"
    );

    process.env.REACT_APP_GRAPHQL_BASE_URL = original;
  });
});