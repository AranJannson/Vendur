import { createClient } from "@supabase/supabase-js";

const catalogSupabase = createClient(
    process.env.CATALOUGE_SUPABASE_URL as string,
    process.env.CATALOUGE_SUPABASE_ANON_KEY as string
);

const analyticsSupabase = createClient(
    process.env.PUBLIC_SUPABASE_URL as string,
    process.env.PUBLIC_SUPABASE_ANON_KEY as string
);

// Returns the total inventory value
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

// Returns a list of any items that are low on stock
export async function lowerStock(){
    const { data, error } = await catalogSupabase
        .from("stock")
        .select("quantity, item:items!id (id, name, price)");
    if (error){
        console.error("Error fetching items:", error);
        return 0;
    }
    let lowItemsList = "";
    const lowStock: string[] = [];
    data.forEach((item) => {
        console.log(item.item);
        const quantity = item.quantity;
        // Checks if item.item is an array or object and acts accordingly 
        const name = Array.isArray(item.item)
        ? (item.item as { name: string }[])[0]?.name 
        : (item.item as { name: string }).name;
        if (quantity < 35){
            lowItemsList+=name;
            lowStock.push(name);
        }
    })

    return lowStock;
}

// Returns a list of items that are out of stock
export async function outOfStock(){
    const { data, error } = await catalogSupabase
        .from("stock")
        .select("quantity, item:items!id (id, name, price)");
    if (error){
        console.error("Error fetching items:", error);
        return 0;
    }
    let outOfStockList = "";
    const outOfStock: string[] = [];
    data.forEach((item) => {
        console.log(item.item);
        const quantity = item.quantity;
        // Checks if item.item is an array or object and acts accordingly 
        const name = Array.isArray(item.item)
        ? (item.item as { name: string }[])[0]?.name 
        : (item.item as { name: string }).name;
        if (quantity == 0){
            outOfStockList+=name;
            outOfStock.push(name)
        }
    })

    return outOfStock;
}

// Returns a list of items and their respective price-stock value (Price X Stock)
export async function listOfItemStockValue(){
    const { data, error } = await catalogSupabase
        .from("stock")
        .select("quantity, item:items!id (id, name, price)");
    if (error){
        console.error("Error fetching items:", error);
        return 0;
    }
    const itemStockValueTable:  Record<string, number>=  {};
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
        if (name){
            itemStockValueTable[name] = (itemStockValueTable[name] || 0 ) + itemTotal
        }

    })

    return itemStockValueTable;
}
