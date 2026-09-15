import { graphql, HttpResponse } from "msw";
import { PORTFOLIO_ID } from "../graphql/constants";
import {
  GetPortfolioVariables,
  UpdatePortfolioPersonalizationVariables,
} from "../graphql/types";
import { getPortfolio, updatePortfolioName } from "./data";

const graphqlApi = graphql.link(
  import.meta.env.VITE_GRAPHQL_BASE_URL || "http://localhost:4000/graphql"
);

export const handlers = [
  graphqlApi.query<{ portfolio: ReturnType<typeof getPortfolio> | null }, GetPortfolioVariables>(
    "GetPortfolio",
    ({ variables }) => {
      if (variables.portfolioId !== PORTFOLIO_ID) {
        return HttpResponse.json({ data: { portfolio: null } });
      }

      return HttpResponse.json({ data: { portfolio: getPortfolio() } });
    }
  ),

  graphqlApi.mutation<
    {
      updatePortfolioPersonalization: {
        __typename: "UpdatePortfolioPersonalizationPayload";
        portfolio: ReturnType<typeof getPortfolio> | null;
        errors: {
          __typename: "PortfolioPersonalizationError";
          field: "PORTFOLIO_ID" | "NAME";
          message: string;
        }[];
      };
    },
    UpdatePortfolioPersonalizationVariables
  >("UpdatePortfolioPersonalization", ({ variables }) => {
    const { portfolioId, name } = variables.input;

    if (portfolioId !== PORTFOLIO_ID) {
      return HttpResponse.json({
        data: {
          updatePortfolioPersonalization: {
            __typename: "UpdatePortfolioPersonalizationPayload",
            portfolio: null,
            errors: [
              {
                __typename: "PortfolioPersonalizationError",
                field: "PORTFOLIO_ID",
                message: "Portfolio not found",
              },
            ],
          },
        },
      });
    }

    if (!name || name.trim().length < 3) {
      return HttpResponse.json({
        data: {
          updatePortfolioPersonalization: {
            __typename: "UpdatePortfolioPersonalizationPayload",
            portfolio: getPortfolio(),
            errors: [
              {
                __typename: "PortfolioPersonalizationError",
                field: "NAME",
                message: "Minimum of 3 characters",
              },
            ],
          },
        },
      });
    }

    const portfolio = updatePortfolioName(name.trim());

    return HttpResponse.json({
      data: {
        updatePortfolioPersonalization: {
          __typename: "UpdatePortfolioPersonalizationPayload",
          portfolio,
          errors: [],
        },
      },
    });
  }),
];