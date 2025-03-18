import {createClient} from "@supabase/supabase-js";

const supabase = createClient(process.env.PUBLIC_SUPABASE_URL as string, process.env.PUBLIC_SUPABASE_ANON_KEY as string);

export async function getTotalSales() {



    // try {
    //     const db = await connect();
    //
    //     const totalSales = await db!.select({
    //         total: sql<number>`SUM(${orders.quantity} * ${items.price})`
    //     })
    //     .from(orders)
    //     .innerJoin(items, eq(orders.item_id, items.id));
    //
    //     return totalSales[0].total ?? 0;
    // } catch (error){
    //     console.error(error)
    //     return 0;
    // }
}

