import '@testing-library/jest-dom/vitest'
import { resetPortfolio } from './mocks/data'
import { server } from './mocks/server'

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
})

afterEach(() => {
  server.resetHandlers()
  resetPortfolio()
})

afterAll(() => {
  server.close()
})
