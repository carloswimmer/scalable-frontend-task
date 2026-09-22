export type PortfolioPersonalizationErrorField = 'PORTFOLIO_ID' | 'NAME'

export interface CashAccount {
  __typename?: 'CashAccount'
  iban: string | null
  bic: string | null
}

export interface PostOnboardingInfo {
  __typename?: 'PostOnboardingInfo'
  id: string
  allStepsCompleted: boolean
}

export interface ProductPersonalization {
  __typename?: 'ProductPersonalization'
  id: string
  name: string
}

export interface Portfolio {
  __typename?: 'Portfolio'
  id: string
  cashAccount: CashAccount | null
  postOnboardingInfo: PostOnboardingInfo
  securitiesAccountNumber: string | null
  custodianBankBIC: string | null
  personalizations: ProductPersonalization | null
}

export interface PortfolioPersonalizationError {
  __typename?: 'PortfolioPersonalizationError'
  field: PortfolioPersonalizationErrorField
  message: string
}

export interface GetPortfolioData {
  portfolio: Portfolio | null
}

export interface GetPortfolioVariables {
  portfolioId: string
}

export interface UpdatePortfolioPersonalizationInput {
  portfolioId: string
  name: string
}

export interface UpdatePortfolioPersonalizationPayload {
  __typename?: 'UpdatePortfolioPersonalizationPayload'
  portfolio: Portfolio | null
  errors: PortfolioPersonalizationError[]
}

export interface UpdatePortfolioPersonalizationData {
  updatePortfolioPersonalization: UpdatePortfolioPersonalizationPayload | null
}

export interface UpdatePortfolioPersonalizationVariables {
  input: UpdatePortfolioPersonalizationInput
}
