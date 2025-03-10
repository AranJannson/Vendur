import { connect } from './dbConnect';
import { orders } from '../drizzle/schema';
import { sql, desc } from 'drizzle-orm';

export async function mostPopularDate(): Promise<any> {
    try {
        const db = await connect();

        const day = await db!.select({
            day: sql`DATE(${orders.created_at})`.as("day"), 
            count: sql`COUNT(*)`.as("count")
        })
        .from(orders)
        .groupBy(sql`DATE(${orders.created_at})`) 
        .orderBy(desc(sql`COUNT(*)`)) 
        .limit(1);

        return day[0];

    } catch (error) {
        console.error("Error fetching most popular order day:", error);
        return null;
    }
}
