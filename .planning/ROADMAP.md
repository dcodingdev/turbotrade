# NexusMarket Roadmap

## Overview
This roadmap organizes the frontend delivery of NexusMarket into focused execution phases. The backend microservices are primarily complete, so these phases focus entirely on the UI/UX, state management, and integration with the existing APIs.

---

## Phase 1: The Core Foundation (Must Haves)
*Establish the fundamental shopping and vendor management flow.*

- [x] **Phase 1.1: Next.js Storefront Foundation** (Storefront, PDPs, Grid) `[DONE]`
  - Implement responsive grid layouts and SEO-optimized Product Detail Pages (PDPs).
  - Connect dynamic fetching (TanStack Query / Next.js caching) for prices and stock.
- [x] **Phase 1.2: Vendor Dashboard Initial CRUD** `[DONE]`
  - Implement dashboard shell, inventory tables, and product CRUD with Zod validation.
- [x] **Phase 1.3: Unified Cart & Checkout Flow** `[DONE]`
  - Implement persistent cart state (localStorage / Zustand).
  - Build the multi-step checkout UI.
  - Integrate Stripe elements and handle real-time stock locking logic (handling 409 Conflicts gracefully).

---

## Phase 2: Operations & Real-Time (Should Haves)
*Enable efficient vendor fulfillment and customer support.*

- [x] **Phase 2.1: Order Management & Timelines** `[DONE]`
  - Implement order tracking UI for customers.
  - Build interactive Timeline/Gantt views for vendors to visualize and transition order states (`Processing` -> `Shipped` -> `Delivered`).
- [x] **Phase 2.2: Real-time Chat** `[DONE]`
  - Implement WebSocket client connections.
  - Build interactive chat windows for customer-vendor communication.
  - Integrate offline notification alerts.
- [x] **Phase 2.3: Admin Oversight Portal** `[DONE]`
  - Build the Admin SPA (React/Vite) for global metrics and moderation.

---

## Phase 3: Polish & Enhancements (Could Haves)
*Refine the experience and add quality-of-life features.*

- [x] **Phase 3.2: Advanced Catalog Management**
 (completed 2026-05-03)
  - Implement drag-and-drop media uploads for vendor products.
  - Add bulk CSV export functionality.

---
*Roadmap generated following NexusMarket project initialization.*
