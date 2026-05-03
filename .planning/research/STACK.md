# Multi-Vendor E-commerce Stack Research

## Standard Industry Stack
- **Storefront**: Next.js (App Router) is the industry standard for high-SEO, fast-TTFB storefronts. SSR is critical for product discovery and core web vitals.
- **Dashboards**: React (Vite) is standard for vendor/admin dashboards where SEO is irrelevant but client-side state is dense.
- **State Management**: Zustand or Jotai are preferred over Redux for Next.js to avoid excessive boilerplate.
- **Styling**: Tailwind CSS is standard. Headless UI libraries (Radix UI, shadcn/ui) are recommended for accessibility.

## Rationale
- Next.js provides hybrid rendering (ISR/SSR) which is essential for dynamic catalog updates without sacrificing SEO.
- Vite for dashboards ensures near-instant HMR during development and optimized single-page bundles.
