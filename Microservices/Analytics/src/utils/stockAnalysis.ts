import {createClient} from "@supabase/supabase-js";

const catalogSupabase = createClient(
    process.env.CATALOUGE_SUPABASE_URL as string,
    process.env.CATALOUGE_SUPABASE_ANON_KEY as string
);

const analyticsSupabase = createClient(
    process.env.PUBLIC_SUPABASE_URL as string,
    process.env.PUBLIC_SUPABASE_ANON_KEY as string
);

export async function inventoryValue(){
    const { data, error } = await catalogSupabase
        .from("stock")
        .select("quantity, item:items!id (price)");

    if (error){
        console.error("Error fetching items:", error);
        return 0;
    }

    let total = 0;
    data.forEach((item) => {
        console.log(item.item);
        // Checks if item.item (price) is an array or object and acts accordingly
        const quantity = item.quantity;
        const price = Array.isArray(item.item) 
        ? (item.item as { price: number }[])[0]?.price 
        : (item.item as { price: number }).price;
        let itemInvTotal = quantity * price;
        total += itemInvTotal;
    })

    return total;
}

export async function lowerStock(){
    const { data, error } = await catalogSupabase
        .from("stock")
        .select("quantity, item:items!id (id, name, price)");
    if (error){
        console.error("Error fetching items:", error);
        return 0;
    }
    let lowItemsList = "";
    data.forEach((item) => {
        console.log(item.item);
        const quantity = item.quantity;
        // Checks if item.item is an array or object and acts accordingly 
        const name = Array.isArray(item.item)
        ? (item.item as { name: string }[])[0]?.name 
        : (item.item as { name: string }).name;
        if (quantity < 35){
            lowItemsList+=name;
        }
    })

    return lowItemsList;
}

export async function outOfStock(){
    const { data, error } = await catalogSupabase
        .from("stock")
        .select("quantity, item:items!id (id, name, price)");
    if (error){
        console.error("Error fetching items:", error);
        return 0;
    }
    let outOfStockList = "";
    data.forEach((item) => {
        console.log(item.item);
        const quantity = item.quantity;
        // Checks if item.item is an array or object and acts accordingly 
        const name = Array.isArray(item.item)
        ? (item.item as { name: string }[])[0]?.name 
        : (item.item as { name: string }).name;
        if (quantity == 0){
            outOfStockList+=name;
        }
    })

    return outOfStockList;
}

export async function mostValuableStockItem(){
    const { data, error } = await catalogSupabase
        .from("stock")
        .select("quantity, item:items!id (id, name, price)");
    if (error){
        console.error("Error fetching items:", error);
        return 0;
    }
    let mostValuableItem = null;
    let highestValue = 0;
    data.forEach((item) => {
        console.log(item.item);
        const quantity = item.quantity;
        // Checks if item.item is an array or object and acts accordingly 
        const price = Array.isArray(item.item)
        ? (item.item as { price: number }[])[0]?.price 
        : (item.item as { price: number }).price;
        const name = Array.isArray(item.item)
        ? (item.item as { name: string }[])[0]?.name 
        : (item.item as { name: string }).name;
        let itemTotal = quantity * price
        if (itemTotal > highestValue){
            highestValue = itemTotal;
            mostValuableItem = {
                name,
                quantity,
                price,
                itemTotal
            }
        }
    })

    return mostValuableItem;
}
