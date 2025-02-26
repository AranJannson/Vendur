import { connect } from './dbConnect';
import { orders, items } from '../drizzle/schema';
import { gt, sql, desc, eq} from 'drizzle-orm';
import { getTotalSales} from "./sales";

export async function getOrderAverage() {
    try {
        const db = await connect();

        const totSales = await getTotalSales()

        const total = await db!.select({
            orderNum: sql<number>`COUNT(*)`
        })
        .from(orders)
        
        const numOrders = total[0].orderNum

        const orderAverage = totSales / numOrders;

        return orderAverage
    } catch (error){
        console.error(error)
    }
}

