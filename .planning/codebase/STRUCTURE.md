# Codebase Structure

```text
ecommerce/
├── apps/                  # Frontend Applications
│   ├── web/               # Next.js Storefront (customer-web)
│   ├── vendor-dashboard/  # Vendor React App (planned)
│   └── admin-panel/       # Admin React App (planned)
│
├── services/              # Backend Microservices
│   ├── api-gateway/       # Nginx / Rate Limiting
│   ├── auth-service/      # JWT, Users, Auth
│   ├── chat-service/      # WebSocket Server
│   ├── email-service/     # SMTP/Email senders
│   ├── order-service/     # Orders logic
│   ├── payment-service/   # Stripe, Payouts
│   └── product-service/   # Catalog, Stock logic
│
├── packages/              # Shared Monorepo Packages
│   └── database/          # Shared ORM schema and client
│
├── infrastructure/        # DevOps & Deployment
│   └── docker/            # Docker Compose files
│
└── .planning/             # Project tracking & Codebase Maps (GSD)
```
