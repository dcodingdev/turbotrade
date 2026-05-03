# Testing Strategy

## Current State
- Minimal testing implemented initially.
- Needs configuration for Jest / Vitest across the monorepo.

## Planned Approaches
1. **Unit Tests**: For core utilities, shared `packages/`, and complex business logic in microservices.
2. **Integration Tests**: API endpoints using supertest.
3. **E2E Tests**: Cypress or Playwright for the Next.js `apps/web` frontend critical flows (checkout, login).

## Continuous Integration
- Tests should be automated via GitHub Actions on PRs.
