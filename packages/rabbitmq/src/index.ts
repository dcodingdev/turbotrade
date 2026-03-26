
import { logger } from '@repo/logger'; // Import your pino logger
import amqp from 'amqplib';
import type { Channel, ChannelModel, ConsumeMessage, Options } from 'amqplib';
/**
 * 📘 RabbitMQ Naming Factory
 */
export const RMQ_NAMES = {
  getExchange: (domain: string, service: string, type: 'topic' | 'direct' = 'topic') => 
    `${domain}.${service}.${type}`.toLowerCase(),

  getRoutingKey: (domain: string, entity: string, action: string) => 
    `${domain}.${entity}.${action}`.toLowerCase(),

  getQueue: (domain: string, service: string, action: string, consumer: string) => 
    `${domain}.${service}.${action}.${consumer}`.toLowerCase()
};

let connection: ChannelModel | null = null;
let channel: Channel | null = null;

export const connectRMQ = async (uri: string) => {
  if (!uri) {
    logger.error('RabbitMQ Connection Error: RABBITMQ_URL is undefined.');
    throw new Error('RABBITMQ_URL missing');
  }

  if (connection && channel) return { connection, channel };

  try {
    connection = await amqp.connect(uri);
    channel = await connection.createChannel();

    logger.info({ host: new URL(uri).hostname }, '🐇 RabbitMQ Connected');

    connection.on('close', () => {
      logger.warn('❌ RabbitMQ connection closed');
      connection = null;
      channel = null;
    });

    return { connection, channel };
  } catch (error) {
    logger.error({ err: error }, '❌ RabbitMQ Connection Failed');
    throw error;
  }
};

export async function stopConsumers() {
  try {
    if (channel) await channel.close();
    if (connection) await connection.close();
    connection = null;
    channel = null;
    logger.info('🛑 RabbitMQ: Connections closed gracefully');
  } catch (error) {
    logger.error({ err: error }, '❌ Error during RabbitMQ shutdown');
  }
}

export const publishEvent = async (
  exchange: string,
  routingKey: string,
  payload: any,
  options: Options.Publish = { persistent: true }
) => {
  if (!channel) throw new Error('RabbitMQ channel not initialized');

  try {
    await channel.assertExchange(exchange, 'topic', { durable: true });
    const success = channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(payload)),
      options
    );

    logger.info({ exchange, routingKey }, '📤 Event Published');
    return success;
  } catch (error) {
    logger.error({ err: error, exchange, routingKey }, '❌ Failed to publish event');
    throw error;
  }
};