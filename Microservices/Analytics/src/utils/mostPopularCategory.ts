import { connect } from './dbConnect';
import { items, reviews, orders } from '../drizzle/schema';
import { gt,sql,eq } from 'drizzle-orm';

export async function popularCategories(): Promise<any> {
    try {
        const db = await connect();

        const popularCategories = await db!.select({
            category: items.category,
            count: sql<number>`cast(count(${orders.item_id}) as int)`
        }).from(orders)
        .leftJoin(items, eq(orders.item_id, items.id))
        // Gets all categories of products and counts how many orders there have been of category
        
        return console.log(JSON.stringify(popularCategories));
        
        
    } catch (error){
        console.error(error);
        return; 
    }
} 

export  async function mostPopularCategory(): Promise<any> {
    try {


        const allCategories = await popularCategories();
        const mostPopularCategory = JSON.stringify(allCategories)[0]
        return console.log(JSON.stringify(mostPopularCategory));

        // Gets product with the highest order count by calling all popular
        // products
        
        
    } catch (error){
        console.error(error);
        return; 
    }
} 







