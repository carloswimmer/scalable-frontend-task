import { PORTFOLIO_ID } from '../graphql/constants'
import type { Portfolio } from '../graphql/types'

const seedPortfolio = (): Portfolio => ({
  __typename: 'Portfolio',
  id: PORTFOLIO_ID,
  cashAccount: {
    __typename: 'CashAccount',
    iban: 'DE89370400440532013000',
    bic: 'COBADEFFXXX',
  },
  postOnboardingInfo: {
    __typename: 'PostOnboardingInfo',
    id: `PostOnboardingInfo-${PORTFOLIO_ID}`,
    allStepsCompleted: true,
  },
  securitiesAccountNumber: '5134823356',
  custodianBankBIC: 'SCABDEMMXXX',
  personalizations: {
    __typename: 'ProductPersonalization',
    id: `ProductPersonalization-${PORTFOLIO_ID}`,
    name: 'Broker Portfolio',
  },
})

let portfolio: Portfolio = seedPortfolio()

export function getPortfolio(): Portfolio {
  return portfolio
}

export function resetPortfolio(): void {
  portfolio = seedPortfolio()
}

export function updatePortfolioName(name: string): Portfolio {
  if (!portfolio.personalizations) {
    portfolio.personalizations = {
      __typename: 'ProductPersonalization',
      id: `ProductPersonalization-${portfolio.id}`,
      name,
    }
  } else {
    portfolio.personalizations = {
      ...portfolio.personalizations,
      __typename: 'ProductPersonalization',
      name,
    }
  }
  return portfolio
}
