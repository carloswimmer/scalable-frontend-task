# Cash Balance Allocation Route — Design Spec

**Date:** 2026-09-15  
**Status:** Approved

## Goal

Add an in-app SPA route at `/cockpit/cash-allocation?portfolioId=` so the existing Cash Balance Allocation link navigates to a read-only product screen instead of a 404.

## Routes

| Path | Screen |
|------|--------|
| `/` | Product Details (unchanged behavior) |
| `/cockpit/cash-allocation` | Cash Balance Allocation (requires `portfolioId` query) |

## Navigation

- `CashAccount` uses React Router `Link`, same tab (remove `target="_blank"`).
- Back control on allocation page links to `/`.

## Data

- **GraphQL:** Reuse existing `GetPortfolio` via `usePortfolio(portfolioId)`.
- **Allocation breakdown:** Not in schema; deterministic read-only percentages derived from `portfolioId` in client code (labeled as illustrative breakdown in UI copy).

## Out of scope

- New GraphQL operations or MSW handlers for allocation.
- Editing or persisting allocation.
- Moving Product Details under `/cockpit/...`.

## Testing

- Update `cash-account.test.tsx` for `Link` (no `target="_blank"`).
- Add page tests: valid `portfolioId`, missing query, loading/error paths as applicable.
