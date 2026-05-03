# NexusMarket

## What This Is

NexusMarket is a full-stack, multi-vendor e-commerce platform designed to connect independent sellers with global customers through a unified, high-performance marketplace. It features three dedicated frontend portals—Customer Storefront, Vendor Dashboard, and Admin Oversight—interacting seamlessly with a robust backend microservices architecture to handle real-time inventory, complex order states, and automated revenue splitting.

## Core Value

To provide a frictionless, real-time marketplace experience where customers can effortlessly discover and purchase products, and vendors can manage their operations and payouts with complete transparency.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. Inferred from existing backend. -->

- ✓ Microservices Architecture — Backend services for Auth, Product, Order, Payment, Chat, and Email established.
- ✓ Database & ORM — Shared PostgreSQL database via `packages/database` with Prisma/Drizzle.
- ✓ Asynchronous Messaging — RabbitMQ for handling inter-service events (e.g., order placement, notifications).
- ✓ Payment Gateway Foundation — Stripe configured in the payment service for checkouts and vendor payouts.
- ✓ API Gateway — Nginx set up for rate-limiting and routing.

### Active

<!-- Current scope. Building toward these for the frontend. -->

- [ ] Customer Storefront (Next.js) — Dynamic Product Grids, Real-time Search Filtering, and Multi-step Checkout Flows.
- [ ] Vendor Dashboard (React/Vite) — Data-dense Management Tables, Drag-and-drop media uploads for catalogs, and financial analytics.
- [ ] Admin Oversight Panel (React/Vite) — Global oversight, user management, and platform analytics.
- [ ] Real-time Inventory UI — Integration with backend stock locking during checkout.
- [ ] Order Management UI — Timeline/Gantt views for tracking order fulfillment stages (Processing to Delivered).
- [ ] Real-time Chat & Notifications — Interactive chat windows between customers and vendors with automated WebSocket alerts.
- [ ] Automated Revenue Splitting UI — Dashboards displaying Platform Commission vs. Vendor Payout timelines.

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- [Mobile Native Apps] — Focusing entirely on responsive web applications for this milestone to ensure rapid delivery.
- [Custom Logistics/Shipping Network] — Relying on third-party shipping statuses rather than building an internal delivery fleet management system.

## Context

- **Backend Readiness**: The backend microservices layer is mostly completed, providing REST endpoints and WebSocket connections ready to be consumed by the frontend.
- **Tech Stack**: Next.js (App Router) with Tailwind CSS v4 for the storefront; React/Vite for internal dashboards.
- **Architecture**: Monorepo using Turborepo to share types and configurations between the frontend apps and backend services.

## Constraints

- **Tech Stack**: Must use React, Next.js, and Tailwind CSS v4 to match the newly initialized frontend stack.
- **Data Consistency**: Must rely on the existing backend services for state truth (e.g., real-time stock locking) rather than managing complex state locally.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| 3 Separate Portals | Different user types (Customers, Vendors, Admins) have vastly different UI/UX needs (SEO vs Data Density). | — Pending |
| Next.js for Customer | SEO is critical for product discovery and the storefront. | — Pending |
| React/Vite for Vendor/Admin | Fast SPAs are better for data-dense, highly interactive dashboards where SEO doesn't matter. | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-02 after project initialization*
