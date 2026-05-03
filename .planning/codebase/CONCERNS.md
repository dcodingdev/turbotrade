# Concerns & Open Questions

## Technical Debt
- **Type Sharing**: Need to ensure `packages/database` properly exports types so that Next.js and Microservices don't have implicit `any` or mismatched types.
- **Service Discovery**: Currently relying on static localhost URLs (as seen in `notes.md`). Needs proper Docker networking for production.

## Open Questions
- **Auth Strategy**: Are we using next-auth for the Next.js frontend, or custom JWT handling matching the `auth-service`?
- **State Management**: Which state manager is best for the Next.js storefront cart? (Zustand or Context API).
- **Module Resolution**: Fix monorepo module resolution bugs between `database` and `order-service` as previously noted in history.
