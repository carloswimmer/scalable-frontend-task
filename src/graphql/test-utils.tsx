import { ApolloProvider } from '@apollo/client/react'
import { type RenderOptions, render } from '@testing-library/react'
import type React from 'react'
import type { ReactElement } from 'react'
import { createApolloClient } from './client'

export function createWrapper() {
  const client = createApolloClient()
  return function ApolloWrapper({ children }: { children: React.ReactNode }) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>
  }
}

export function renderWithApollo(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(ui, { wrapper: createWrapper(), ...options })
}
