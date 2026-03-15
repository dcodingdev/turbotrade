import mongoose from 'mongoose';

/**
 * A simple helper to connect to MongoDB.
 * It prevents multiple connections if called multiple times.
 */
export const connectDB = async (uri: string) => {
    if (!uri) {
        throw new Error('❌ Database Connection Error: MONGO_URI is undefined. Check your .env file.');
    }
    if (mongoose.connection.readyState >= 1) {
        return mongoose.connection;
    }

    try {
        const conn = await mongoose.connect(uri);
        console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
        return conn.connection;
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error);
        throw error;
    }
};

// Export mongoose so services use this exact instance
export { mongoose };