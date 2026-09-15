import { useMutation, useQuery } from "@apollo/client/react";
import {
  GET_PORTFOLIO,
  UPDATE_PORTFOLIO_PERSONALIZATION,
} from "../../graphql/operations";
import {
  GetPortfolioData,
  GetPortfolioVariables,
  UpdatePortfolioPersonalizationData,
  UpdatePortfolioPersonalizationVariables,
} from "../../graphql/types";

export function usePortfolio(portfolioId: string) {
  const { data, loading, error } = useQuery<
    GetPortfolioData,
    GetPortfolioVariables
  >(GET_PORTFOLIO, {
    variables: { portfolioId },
  });

  const [updatePersonalization] = useMutation<
    UpdatePortfolioPersonalizationData,
    UpdatePortfolioPersonalizationVariables
  >(UPDATE_PORTFOLIO_PERSONALIZATION);

  const rename = async (name: string): Promise<string | void> => {
    try {
      const result = await updatePersonalization({
        variables: { input: { portfolioId, name } },
      });

      const payload = result.data?.updatePortfolioPersonalization;

      if (payload?.errors?.length) {
        return payload.errors[0].message;
      }
    } catch (err) {
      return err instanceof Error ? err.message : "Failed to rename portfolio";
    }
  };

  return {
    portfolio: data?.portfolio ?? null,
    loading,
    error: error ? error.message : null,
    rename,
  };
}