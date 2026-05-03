# Architecture

## Monorepo Microservices Architecture
The project follows a modular microservice pattern managed inside a Monorepo using Turborepo.

### Core Components
1. **API Gateway**: Nginx-based proxy that handles rate limiting and routing requests to the underlying microservices.
2. **Microservices**:
   - `auth-service`: User & Vendor authentication, profile management.
   - `product-service`: Catalog, products, and categories.
   - `order-service`: Order lifecycle, carts, and fulfillment.
   - `payment-service`: Checkout, Stripe integration, and vendor payouts.
   - `inventory-service` / `stock`: Stock levels and reservation.
   - `chat-service`: WebSockets for real-time customer-vendor chats.
   - `email-service`: Notifications and receipts.

### Frontend
- **customer-web**: Server-Side Rendered (SSR) Next.js storefront interacting with microservices via the API Gateway.
- **admin-panel** & **vendor-dashboard**: SPAs for management.

### Data Flow
- **Synchronous**: Direct HTTP/REST requests between API Gateway and Microservices.
- **Asynchronous**: RabbitMQ used for emitting events (e.g., `OrderPlaced` -> `PaymentService`, `PaymentSuccess` -> `EmailService`).
