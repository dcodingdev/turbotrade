# Multi-Vendor Architecture Patterns

## Cart Splitting vs Unified Checkout
- **Unified Checkout (Recommended)**: The user pays once. The backend `payment-service` handles the payout splitting (e.g., Stripe Connect) automatically.
- **Split Cart**: The user has to checkout per vendor. Avoid this, as it drops conversion rates significantly.

## State Management Architecture
- **Server State**: React Query (TanStack Query) is highly recommended for fetching and caching backend data (products, orders) to avoid stale data.
- **Client State**: Minimal global state. Cart state should be persisted to localStorage and synced with the `order-service` to prevent data loss across devices.
