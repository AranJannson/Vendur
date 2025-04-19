import {createClient} from "@supabase/supabase-js";

type Item = {
    id: string;
    name: string;
    price: number;
    discount: number;
    category: string;
    org_id: string;
};

export default async function orderProcessing(basket: Item[], user_id: string) {

    const supabase = createClient(process.env.PUBLIC_SUPABASE_URL as string, process.env.PUBLIC_SUPABASE_ANON_KEY as string);

    const itemsLogMap = new Map<string, { item: Item; quantity: number }>

    for (const item of basket) {
        const checkIfExists = itemsLogMap.get(item.id);
        if (checkIfExists) {
            checkIfExists.quantity += 1;
        } else {
            itemsLogMap.set(item.id, { item, quantity: 1 });
        }
    }

    const itemIds = Array.from(itemsLogMap.values()).map(({ item }) => Number(item.id));
    const quantities = Array.from(itemsLogMap.values()).map(({ quantity }) => quantity);

    try{
        const { error } = await supabase.from("orders").insert([{items: itemIds, quantity: quantities, user_id},]);

        if (error) {
            console.error("Error inserting order:", error);
            return 0;
        }
    }catch (error){
        console.error("Error inserting order:", error);
        return 0;
    }

    return 1;

}

export async function getOrderDetails(order_id: string) {
    const supabase = createClient(process.env.PUBLIC_SUPABASE_URL as string, process.env.PUBLIC_SUPABASE_ANON_KEY as string);

    try {
        const { data, error } = await supabase.from("orders").select("*").eq("id", order_id);

        if (error) {
            console.error("Error fetching order details:", error);
            return null;
        }

        return data;
    } catch (error) {
        console.error("Error fetching order details:", error);
        return null;
    }
}
