import {createClient} from "@supabase/supabase-js";

const supabase = createClient(process.env.PUBLIC_SUPABASE_URL as string, process.env.PUBLIC_SUPABASE_ANON_KEY as string);

export async function popularCategories(): Promise<any> {
    // try {
    //     const db = await connect();
    //
    //     const popularCategories = await db!.select({
    //         category: items.category,
    //         count: sql<number>`cast(count(${items.category}) as int)`
    //     }).from(orders)
    //     .leftJoin(items, eq(orders.item_id, items.id))
    //     .groupBy(items.category)
    //     .orderBy(desc(sql<number>`CAST(COUNT(${items.category}) AS INT)`));
    //     // Gets all categories of products and counts how many orders there have been of category
    //
    //     return popularCategories;
    //
    //
    // } catch (error){
    //     console.error(error);
    //     return;
    // }
} 

export  async function mostPopularCategory(): Promise<any> {
    // try {
    //
    //
    //     const allCategories = await popularCategories();
    //     const mostPopularCategory = allCategories[0];
    //     return mostPopularCategory;
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







