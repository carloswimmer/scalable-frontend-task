import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

export function createApolloClient() {
  const uri = import.meta.env.VITE_GRAPHQL_BASE_URL

  if (!uri) {
    throw new Error('VITE_GRAPHQL_BASE_URL is not set')
  }

  return new ApolloClient({
    link: new HttpLink({ uri }),
    cache: new InMemoryCache(),
  })
}
