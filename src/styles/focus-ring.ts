import { css } from 'styled-components'

export const focusRingVisible = css`
  outline: var(--focus-ring-outline-width) solid transparent;
  outline-offset: var(--focus-ring-offset);
  box-shadow:
    0 0 0 var(--focus-ring-inner) var(--woodsmoke),
    0 0 0 var(--focus-ring-outer) var(--white);
`
