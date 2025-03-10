import { connect } from './dbConnect';
import { items, stock } from '../drizzle/schema';
import { gt,sql,eq, desc, lt } from 'drizzle-orm';


export async function lowStock(): Promise<any>{
    try {
        const db = await connect();

        const lowProducts = await db!.select({
            itemId: stock.item_id,
            itemName: items.name,
            stock: stock.quantity
        })
        .from(stock)
        .innerJoin(items, eq(stock.item_id, items.id))
        .where(lt(stock.quantity, 10));

        return lowProducts

    } catch (error){
        console.error(error);
        return;
    }
}








