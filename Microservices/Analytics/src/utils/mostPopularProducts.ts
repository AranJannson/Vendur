import { connect } from './dbConnect';
import { items } from '../drizzle/schema';

export default async function mostPopularProducts() {
    try {
        const db = await connect();
        console.log("Database connected successfully.");
        for (let i=0; i<5; i++){
            const product = await db!.select().from(items).limit(1);
            

        }
        return db;
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw new Error("Failed to connect to the database.");
    }
}