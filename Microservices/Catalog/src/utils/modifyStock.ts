// import { eq } from 'drizzle-orm';
// import { items, items_stock } from '../drizzle/schema'
// import { connect } from './dbConnect'
//
//
// export default function modifyStockQuantity(item_id: string, quantity: string) {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const db = await connect();
//
//             const existingStock = await db!.select().from(items_stock).where(eq(items_stock.item_id, item_id));
//
//             let stock;
//             if (existingStock.length > 0) {
//                 stock = await db!.update(items_stock).set({ quantity }).where(eq(items_stock.item_id, item_id));
//                 console.log(`Stock for item ${item_id} has been updated to ${quantity}`);
//             } else {
//                 stock = await db!.insert(items_stock).values({ item_id, quantity });
//                 console.log(`Stock for item ${item_id} has been added with quantity ${quantity}`);
//             }
//
//             resolve(stock);
//         } catch (error) {
//             reject(error);
//         }
//     });
// }
//
//
// export function modifyItemName(item_id: string, name: string) {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const db = await connect();
//
//             const item = await db!.update(items).set({ name }).where(eq(items.id, Number(item_id)));
//
//             resolve(item);
//
//             console.log(`Item ${item_id} has been updated to ${name}`);
//
//         } catch (error) {
//             reject(error);
//         }
//     });
// }
//
//
// export function removeItem(item_id: string) {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const db = await connect();
//
//             const item = await db!.delete(items).where(eq(items.id, Number(item_id)));
//
//             resolve(item);
//
//             console.log(`Item ${item_id} has been removed`);
//
//         } catch (error) {
//             reject(error);
//         }
//     });
// }
//
//
// export function addItem(name: string) {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const db = await connect();
//
//             const item = await db!.insert(items).values({ name });
//
//             resolve(item);
//
//             console.log(`Item ${name} has been added`);
//
//         } catch (error) {
//             reject(error);
//         }
//     });
// }