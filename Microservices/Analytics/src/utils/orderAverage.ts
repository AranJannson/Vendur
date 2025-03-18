import {createClient} from "@supabase/supabase-js";

const supabase = createClient(process.env.PUBLIC_SUPABASE_URL as string, process.env.PUBLIC_SUPABASE_ANON_KEY as string);

export async function getOrderAverage() {

    //TODO: To be completed by Noah on new architecture

    // try {
    //     const db = await connect();
    //
    //     const totSales = await getTotalSales()
    //
    //     const total = await db!.select({
    //         orderNum: sql<number>`COUNT(*)`
    //     })
    //     .from(orders)
    //
    //     const numOrders = total[0].orderNum
    //
    //     const orderAverage = totSales / numOrders;
    //
    //     return orderAverage
    // } catch (error){
    //     console.error(error)
    // }
}

