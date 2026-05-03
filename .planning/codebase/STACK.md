# Tech Stack

## Frontend (Apps)
- **customer-web**: Next.js (App Router), React, Tailwind CSS v4, TypeScript
- **vendor-dashboard** (Planned): React / Vite
- **admin-panel** (Planned): React / Vite

## Backend (Microservices)
- **Node.js / Express or Fastify** (for individual microservices)
- **TypeScript**: Used strictly across all services.

## Database & Caching
- **PostgreSQL / MySQL**: Primary relational database via `packages/database`.
- **Prisma / Drizzle**: ORM (Based on typical Next.js/Node.js stack and gitignore).
- **Redis**: For caching and session management (common in this stack).

## Infrastructure & DevOps
- **Docker & Docker Compose**: For containerization and local development (`infrastructure/docker`).
- **Turborepo**: Monorepo build system (`pnpm turbo`).
- **Nginx**: API Gateway / Reverse Proxy (based on open file `nginx.conf`).

## Package Management
- **pnpm**: Monorepo package manager.
