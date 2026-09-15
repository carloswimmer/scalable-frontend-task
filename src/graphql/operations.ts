import { gql } from "@apollo/client";

export const GET_PORTFOLIO = gql`
  query GetPortfolio($portfolioId: ID!) {
    portfolio(portfolioId: $portfolioId) {
      id
      cashAccount {
        iban
        bic
      }
      postOnboardingInfo {
        id
        allStepsCompleted
      }
      securitiesAccountNumber
      custodianBankBIC
      personalizations {
        id
        name
      }
    }
  }
`;

export const UPDATE_PORTFOLIO_PERSONALIZATION = gql`
  mutation UpdatePortfolioPersonalization($input: UpdatePortfolioPersonalizationInput!) {
    updatePortfolioPersonalization(input: $input) {
      portfolio {
        id
        personalizations {
          id
          name
        }
      }
      errors {
        field
        message
      }
    }
  }
`;
