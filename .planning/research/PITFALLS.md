# Common Pitfalls in Multi-Vendor E-commerce

1. **Overselling (Stock Race Conditions)**
   - *Problem*: Two users checkout the same last item simultaneously.
   - *Mitigation*: The frontend must clearly indicate "low stock" and gracefully handle HTTP 409 (Conflict) errors if the `order-service` rejects the checkout due to insufficient stock.

2. **Payout Complexities & Refunds**
   - *Problem*: Reversing a payment after the vendor has been paid out.
   - *Mitigation*: Implement a "clearing period" (e.g., 7 days) in the `vendor-dashboard` before funds become withdrawable.

3. **Stale Product Data**
   - *Problem*: Next.js SSG pages show outdated prices.
   - *Mitigation*: Use Next.js ISR (Incremental Static Regeneration) or dynamic fetching for price and stock. Only cache the product description and images.
