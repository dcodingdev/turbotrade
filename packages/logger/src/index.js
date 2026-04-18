import pino from 'pino';
const isDevelopment = process.env.NODE_ENV !== 'production';
export const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    transport: isDevelopment
        ? {
            target: 'pino-pretty',
            options: {
                colorize: true,
                levelFirst: true,
                translateTime: 'yyyy-mm-dd HH:MM:ss Z',
            },
        }
        : undefined,
});
// Default export for convenience
export default logger;
//# sourceMappingURL=index.js.map