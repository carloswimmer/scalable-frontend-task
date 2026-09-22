import { ApolloClient } from '@apollo/client'
import { vi } from 'vitest'
import { createApolloClient } from './client'

describe('createApolloClient', () => {
  it('returns an ApolloClient', () => {
    expect(createApolloClient()).toBeInstanceOf(ApolloClient)
  })

  it('throws when VITE_GRAPHQL_BASE_URL is missing', () => {
    vi.stubEnv('VITE_GRAPHQL_BASE_URL', '')
    expect(() => createApolloClient()).toThrow(
      'VITE_GRAPHQL_BASE_URL is not set',
    )
    vi.unstubAllEnvs()
  })
})
