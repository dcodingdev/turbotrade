// import { connectRMQ, RMQ_NAMES } from '@repo/rabbitmq';
// import { logger } from '@repo/logger';
// import { type ConsumeMessage } from 'amqplib';

// const { getExchange, getRoutingKey, getQueue } = RMQ_NAMES;

// export const startProductConsumers = async () => {
//   const url = process.env.RABBITMQ_URL;
//   if (!url) return;

//   try {
//     const { channel } = await connectRMQ(url);

//     const exchange = getExchange('catalog', 'product'); 
//     const routingKey = getRoutingKey('catalog', 'product', 'created'); 
//     const queueName = getQueue('catalog', 'product', 'created', 'search-service'); 

//     await channel.assertExchange(exchange, 'topic', { durable: true });
//     await channel.assertQueue(queueName, { durable: true });
//     await channel.bindQueue(queueName, exchange, routingKey);

//     logger.info({ queueName, routingKey }, '📡 Consumer Bound and Listening');

//     await channel.consume(queueName, (msg: ConsumeMessage | null) => {
//       if (!msg) return;

//       try {
//         const content = JSON.parse(msg.content.toString());
        
//         // Structured logging makes searching in Datadog/ELK much easier
//         logger.info({ 
//           msgId: msg.properties.messageId, 
//           productName: content.name 
//         }, '📥 Message Received');

//         // Business logic...
        
//         channel.ack(msg);
//       } catch (error) {
//         logger.error({ 
//           err: error, 
//           rawContent: msg.content.toString() 
//         }, '❌ Consumer Logic Error');
        
//         channel.nack(msg, false, false);
//       }
//     });

//   } catch (error) {
//     logger.fatal({ err: error }, '💥 Critical Failure starting Product Consumer');
//   }
// };

import { Channel } from "amqplib";
import { RMQ_NAMES } from "@repo/rabbitmq";
import { Product } from "src/modules/products/product.model";
import { Stock } from "src/modules/stock/stock.model";

export const startProductConsumer = async (channel: Channel) => {
  const exchange = RMQ_NAMES.getExchange("system", "core", "topic");
  const queue = RMQ_NAMES.getQueue("product", "product", "events", "main");

  await channel.assertExchange(exchange, "topic", { durable: true });
  await channel.assertQueue(queue, { durable: true });

  await channel.bindQueue(queue, exchange, "user.updated");
  await channel.bindQueue(queue, exchange, "order.created");
  await channel.bindQueue(queue, exchange, "order.paid");
  await channel.bindQueue(queue, exchange, "order.cancelled");

  channel.consume(queue, async (msg) => {
    if (!msg) return;

    const event = JSON.parse(msg.content.toString());

    try {
      switch (event.event) {

        /**
         * USER SYNC
         */
        case "user.updated.v1":
          await Product.updateMany(
            { "vendor.id": event.data.id },
            { $set: { "vendor.name": event.data.name } }
          );
          break;

        /**
         * ORDER CREATED → reserve stock
         */
        case "order.created.v1":
          for (const item of event.data.items) {
            await Stock.updateOne(
              { productId: item.productId },
              { $inc: { reservedQuantity: item.quantity } }
            );
          }
          break;

        /**
         * ORDER PAID → finalize stock
         */
        case "order.paid.v1":
          for (const item of event.data.items) {
            await Stock.updateOne(
              { productId: item.productId },
              {
                $inc: {
                  reservedQuantity: -item.quantity,
                  quantity: -item.quantity,
                },
              }
            );
          }
          break;

        /**
         * ORDER CANCELLED → release stock
         */
        case "order.cancelled.v1":
          for (const item of event.data.items) {
            await Stock.updateOne(
              { productId: item.productId },
              { $inc: { reservedQuantity: -item.quantity } }
            );
          }
          break;
      }

      channel.ack(msg);
    } catch (err) {
      channel.nack(msg, false, false);
    }
  });
};