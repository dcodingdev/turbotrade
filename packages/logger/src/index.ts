// import pino from 'pino';

// // Define your levels to ensure consistency across the app
// export enum LogLevel {
//   INFO = 'info',
//   WARN = 'warn',
//   ERROR = 'error',
//   DEBUG = 'debug',
// }

// const logger = pino({
//   // Set the minimum level to log. If process.env.LOG_LEVEL is 'warn', 
//   // 'info' and 'debug' logs will be ignored.
//   level: process.env.LOG_LEVEL || LogLevel.DEBUG,
  
//   transport: process.env.NODE_ENV !== 'production' 
//     ? {
//         target: 'pino-pretty',
//         options: {
//           colorize: true,
//           levelFirst: true,
//           translateTime: 'yyyy-mm-dd HH:MM:ss Z',
//         },
//       }
//     : undefined,
// });

// export default logger;





