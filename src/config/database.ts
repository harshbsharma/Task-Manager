

import mongoose from 'mongoose';

const connectMongoDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.DATABASE_URL as string);
        console.log('Connected to MongoDB.');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
};

export default connectMongoDB;
