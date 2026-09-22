import '@testing-library/jest-dom'
import { act, renderHook, waitFor } from '@testing-library/react'
import { PORTFOLIO_ID } from '../../graphql/constants'
import { createWrapper } from '../../graphql/test-utils'
import { usePortfolio } from './use-portfolio'

describe('usePortfolio', () => {
  it('loads the seeded portfolio', async () => {
    const { result } = renderHook(() => usePortfolio(PORTFOLIO_ID), {
      wrapper: createWrapper(),
    })

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBeNull()
    expect(result.current.portfolio?.personalizations?.name).toBe(
      'Broker Portfolio',
    )
    expect(result.current.portfolio?.cashAccount?.iban).toBe(
      'DE89370400440532013000',
    )
  })

  it('renames the portfolio through the mutation', async () => {
    const { result } = renderHook(() => usePortfolio(PORTFOLIO_ID), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    let renameError: string | undefined
    await act(async () => {
      renameError = await result.current.rename('Growth Portfolio')
    })

    expect(renameError).toBeUndefined()
    await waitFor(() => {
      expect(result.current.portfolio?.personalizations?.name).toBe(
        'Growth Portfolio',
      )
    })
  })

  it('returns a payload error for an unknown portfolio id on rename', async () => {
    const { result } = renderHook(() => usePortfolio('unknown-id'), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.portfolio).toBeNull()

    let renameError: string | undefined
    await act(async () => {
      renameError = await result.current.rename('Growth Portfolio')
    })
    expect(renameError).toBe('Portfolio not found')
  })
})
