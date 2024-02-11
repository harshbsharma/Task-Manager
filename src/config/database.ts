// import { MongoClient } from 'mongodb';

// let cachedClient: MongoClient;

// async function connectToDatabase() {
//     if (cachedClient) {
//         return cachedClient;
//     }

//     const client = new MongoClient("mongodb+srv://simplegoodsmart:AyVD6s40P1SP92K4@cluster0.p7mqnyg.mongodb.net/interntest");
//     try {
//         await client.connect();
//         cachedClient = client;
//         return client;
//     } catch (error) {
//         throw new Error('Failed to connect to MongoDB');
//     }
// }

// export { connectToDatabase };


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
