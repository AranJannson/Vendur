// import { items, orders } from '../drizzle/schema'
// import { connect } from './dbConnect'
// import { eq } from 'drizzle-orm';

// export default async function viewOrders(){

//     const db  = await connect();

//     const stock = await db!.select().from(orders)

//     return(JSON.stringify(stock, null, 2))

// }


// export async function getItemInfo(item_id: number){

//     const db  = await connect();

//     const itemDetails = await db!.select().from(items).where(eq(items.item_id, item_id))

//     return(JSON.stringify(itemDetails, null, 2))

// }