# Integrations

## Payment Gateways
- **Stripe**: Configured in `payment-service` and webhooks caught in `apps/web/src/app/api/webhooks/stripe`.

## Communication
- **RabbitMQ**: Message broker for inter-service communication (e.g., `order.consumer.ts` in `order-service` and `rabbit-consumer.ts` in `product-service`).

## External Services
- **Email Service**: For transactional emails.
- **Chat Service**: Real-time communication via WebSockets.
