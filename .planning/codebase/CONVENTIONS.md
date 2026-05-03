# Conventions

## Monorepo
- Use `pnpm turbo run <script> --filter=<package>` to run tasks.
- Shared code should be extracted into `packages/`.

## TypeScript
- Strict type checking is enabled.
- Prefer interfaces for object shapes and types for unions.
- No `any` types allowed. Use `unknown` if necessary.

## API Services
- Controllers, Routes, and Services should be separated.
- Follow module-based structure (e.g., `src/modules/products/product.routes.ts`).

## Frontend (Next.js)
- Use App Router `src/app/`.
- Organize features in `src/modules/` (e.g., auth, catalog, cart).
- Use `src/components/ui/` for dumb/shared presentation components.
- Use `tailwindcss` v4 exclusively for styling.
