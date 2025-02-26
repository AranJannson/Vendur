import { connect } from './dbConnect';
import { orders, items } from '../drizzle/schema';
import { gt, sql, desc, eq} from 'drizzle-orm'

export async function getTotalSales() {
    try {
        const db = await connect();

        const totalSales = await db!.select({
            total: sql<number>`SUM(${orders.quantity} * ${items.price})`
        })
        .from(orders)
        .innerJoin(items, eq(orders.item_id, items.id));

        return totalSales[0].total ?? 0;
    } catch (error){
        console.error(error)
        return 0;
    }
}

