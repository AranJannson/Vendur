import {createClient} from "@supabase/supabase-js";

const supabase = createClient(process.env.PUBLIC_SUPABASE_URL as string, process.env.PUBLIC_SUPABASE_ANON_KEY as string);

export async function popularProducts(): Promise<any> {
    // try {
    //     const db = await connect();
    //
    //     const popularProducts = await db!.select({
    //         item_id: orders.item_id,
    //         count: sql<number>`CAST(COUNT(${orders.item_id}) AS INT)`
    //     })
    //     .from(orders)
    //     .groupBy(orders.item_id)
    //     .orderBy(desc(sql<number>`CAST(COUNT(${orders.item_id}) AS INT)`));
    //     // Gets all products and counts how many orders there have been of product
    //
    //     // return console.log(JSON.stringify(popularProducts));
    //     return popularProducts
    //
    //
    // } catch (error){
    //     console.error(error);
    //     return;
    // }
} 

export  async function mostPopularProduct(): Promise<any> {
    // try {
    //
    //
    //     const allProducts = await popularProducts();
    //     console.log(JSON.stringify(allProducts))
    //     const mostPopularProduct = allProducts[0];
    //     return mostPopularProduct;
    //
    //     // Gets product with the highest order count by calling all popular
    //     // products
    //
    //
    // } catch (error){
    //     console.error(error);
    //     return;
    // }
} 







