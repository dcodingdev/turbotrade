import amqp from 'amqplib';
export declare const RMQ_NAMES: {
    getExchange: (domain: string, service: string, type?: "topic" | "direct") => string;
    getRoutingKey: (domain: string, entity: string, action: string) => string;
    getQueue: (domain: string, service: string, action: string, consumer: string) => string;
};
export interface RMQEvent<T = any> {
    event: string;
    data: T;
    meta: {
        messageId: string;
        timestamp: string;
        source: string;
        version: number;
    };
}
export declare const connectRMQ: (uri: string) => Promise<{
    connection: amqp.ChannelModel;
    channel: amqp.Channel;
}>;
export declare const publishEvent: (exchange: string, routingKey: string, payload: any) => Promise<boolean>;
/**
 * 📥 NEW: consumeEvent
 * This was missing from your repo, causing the "Cannot find name" error.
 */
export declare const consumeEvent: (exchange: string, routingKey: string, queueName: string, onMessage: (msg: RMQEvent) => Promise<void>) => Promise<void>;
export declare function stopConsumers(): Promise<void>;
