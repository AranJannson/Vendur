import { sellers } from "../drizzle/schema";
import { connect } from "./dbConnect";
import { eq } from "drizzle-orm"

export async function addSeller(name: string, email: string) {
    const db = await connect();

    const newSeller = await db!.insert(sellers).values({
        name,
        email,
    }).returning();

    return JSON.stringify(newSeller, null, 2);
}

export async function getSellerInfo(seller_id: number) {
    const db = await connect();

    const sellerDetails = await db!.select().from(sellers).where(eq(sellers.seller_id, seller_id));

    return JSON.stringify(sellerDetails, null, 2);
}

export async function getAllSellers() {
    const db = await connect();

    const allSellers = await db!.select().from(sellers);

    return JSON.stringify(allSellers, null, 2);
}

export async function verifySeller(seller_id: number) {
    const db = await connect();

    const verifiedSeller = await db!.update(sellers).set({ is_verified: true }).where(eq(sellers.seller_id, seller_id)).returning();
    console.log(`Seller with id: ${seller_id} verified`);

    return JSON.stringify(verifiedSeller, null, 2);
}

export async function banSeller(seller_id: number) {
    const db = await connect();

    const bannedSeller = await db!.update(sellers).set({ is_banned: true }).where(eq(sellers.seller_id, seller_id)).returning();
    console.log(`Seller with id: ${seller_id} banned`);
    
    return JSON.stringify(bannedSeller, null, 2);
}