# NexusMarket Requirements

## Core Epics & User Flows

### Epic 1: Customer Storefront & Discovery
- **As a customer**, I want to browse products dynamically, filter them by price/category/vendor, and view SEO-optimized product pages.
- **As a customer**, I want to add items from multiple vendors into a unified cart and checkout once.

### Epic 2: Vendor Operations
- **As a vendor**, I want a dedicated, data-dense dashboard to upload products, manage stock levels, and track my incoming orders using a Timeline or Gantt view.
- **As a vendor**, I want to see my earnings, platform commission deductions, and estimated payout timeline.

### Epic 3: Admin Oversight
- **As an admin**, I want to suspend users or unlist violating products globally across the platform.

### Epic 4: Real-time Interactions
- **As a customer/vendor**, I want to chat in real-time regarding a product or order, with automated notifications when I am offline.

## MoSCoW Prioritization

### Must Have (Phase 1)
- Unified multi-vendor cart and checkout (Stripe integration).
- Next.js SSR Storefront with dynamic grids.
- React/Vite Vendor Dashboard with product CRUD and stock management.
- Order state transitions (Processing -> Shipped -> Delivered).
- Protection against stock race conditions (locking stock during checkout).

### Should Have (Phase 2)
- Real-time chat (WebSockets).
- Timeline or Gantt views for order tracking.
- Admin dashboard for global oversight.

### Could Have (Phase 3)
- Drag-and-drop media uploads for vendor product catalogs.

### Won't Have (Out of Scope)
- Mobile Native Apps.
- Internal custom logistics network.

## Technical Requirements
- **Frontend**: Next.js App Router, React, Vite, Tailwind CSS v4.
- **State Management**: TanStack Query for server state (handling stale product data); Zustand/localStorage for persistent cart state.
- **Payouts**: Vendors must have a 7-day clearing period before funds become available to mitigate refund complexities.
