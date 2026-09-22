import { createApolloClient } from '../graphql/client'
import { PORTFOLIO_ID } from '../graphql/constants'
import {
  GET_PORTFOLIO,
  UPDATE_PORTFOLIO_PERSONALIZATION,
} from '../graphql/operations'
import type {
  GetPortfolioData,
  GetPortfolioVariables,
  UpdatePortfolioPersonalizationData,
  UpdatePortfolioPersonalizationVariables,
} from '../graphql/types'
import { resetPortfolio } from './data'

describe('GraphQL MSW handlers', () => {
  beforeEach(() => {
    resetPortfolio()
  })

  it('returns the seeded portfolio for GetPortfolio', async () => {
    const client = createApolloClient()
    const result = await client.query<GetPortfolioData, GetPortfolioVariables>({
      query: GET_PORTFOLIO,
      variables: { portfolioId: PORTFOLIO_ID },
      fetchPolicy: 'network-only',
    })

    expect(result.error).toBeUndefined()
    expect(result.data?.portfolio).toMatchObject({
      id: PORTFOLIO_ID,
      personalizations: { name: 'Broker Portfolio' },
      cashAccount: {
        iban: 'DE89370400440532013000',
        bic: 'COBADEFFXXX',
      },
      securitiesAccountNumber: '5134823356',
      custodianBankBIC: 'SCABDEMMXXX',
    })
  })

  it('returns PORTFOLIO_ID error for an unknown id on mutate', async () => {
    const client = createApolloClient()
    const result = await client.mutate<
      UpdatePortfolioPersonalizationData,
      UpdatePortfolioPersonalizationVariables
    >({
      mutation: UPDATE_PORTFOLIO_PERSONALIZATION,
      variables: {
        input: { portfolioId: 'unknown', name: 'Growth Portfolio' },
      },
    })

    expect(result.data?.updatePortfolioPersonalization).toEqual({
      __typename: 'UpdatePortfolioPersonalizationPayload',
      portfolio: null,
      errors: [
        {
          __typename: 'PortfolioPersonalizationError',
          field: 'PORTFOLIO_ID',
          message: 'Portfolio not found',
        },
      ],
    })
  })

  it('updates the stored name and returns it on later GetPortfolio', async () => {
    const client = createApolloClient()

    const mutateResult = await client.mutate<
      UpdatePortfolioPersonalizationData,
      UpdatePortfolioPersonalizationVariables
    >({
      mutation: UPDATE_PORTFOLIO_PERSONALIZATION,
      variables: {
        input: { portfolioId: PORTFOLIO_ID, name: 'Growth Portfolio' },
      },
    })

    expect(mutateResult.data?.updatePortfolioPersonalization?.errors).toEqual(
      [],
    )
    expect(
      mutateResult.data?.updatePortfolioPersonalization?.portfolio
        ?.personalizations?.name,
    ).toBe('Growth Portfolio')

    const queryResult = await client.query<
      GetPortfolioData,
      GetPortfolioVariables
    >({
      query: GET_PORTFOLIO,
      variables: { portfolioId: PORTFOLIO_ID },
      fetchPolicy: 'network-only',
    })

    expect(queryResult.data?.portfolio?.personalizations?.name).toBe(
      'Growth Portfolio',
    )
  })
})
