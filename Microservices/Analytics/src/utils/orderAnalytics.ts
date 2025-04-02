import {createClient} from "@supabase/supabase-js";

const supabase = createClient(process.env.PUBLIC_SUPABASE_URL as string, process.env.PUBLIC_SUPABASE_ANON_KEY as string);

const catalogSupabase = createClient(
    process.env.CATALOUGE_SUPABASE_URL as string,
    process.env.CATALOUGE_SUPABASE_ANON_KEY as string
);

const analyticsSupabase = createClient(
    process.env.PUBLIC_SUPABASE_URL as string,
    process.env.PUBLIC_SUPABASE_ANON_KEY as string
);

// Returns value of total revenue
export async function totalSalesEver() {
    const {data, error} = await catalogSupabase
        .from("orders")
        .select("price")

    if (error){
        console.error("Error fetching items:", error)
        return null;
    }

    let total = 0;

    data.forEach((item) => {
        const price = item.price;
        total += price;
    })

    return total;
}

// Shows list of how many sales happened per day (actual number of orders, not order value)
export async function orderNumberDailyList() {
    const {data, error} = await catalogSupabase
    .from("orders").select("created_at, price")

    if (error){
        console.error("Error fetching items:", error)
        return 0;
    }

    const dateCount: Record<string, number> = {};

    data.forEach((item) => {
        const createdAt = item.created_at;
        let timestampString = String(createdAt)
        let date = timestampString.slice(0,10)
        if (date){
            dateCount[date] = (dateCount[date] || 0) + 1;
        }
    })

    return dateCount;
}

// Returns a list of revenue per day
export async function totalRevenuePerDayList() {
    const {data, error} = await catalogSupabase
    .from("orders").select("created_at, price")

    if (error){
        console.error("Error fetching items:", error)
        return 0;
    }
    const dateCount: Record<string, number> = {};

    data.forEach((item) => {
        const createdAt = item.created_at;
        const price = item.price;
        let timestampString = String(createdAt)
        let date = timestampString.slice(0,10)
        if (date){
            dateCount[date] = (dateCount[date] || 0) + price;
        }
    })

    return dateCount;

}

// Returns a list of days and the average order value for these days
export async function averageOrderValuePerDayList() {
    const {data, error} = await catalogSupabase
        .from("orders").select("created_at, price")

    if (error){
        console.error("Error fetching items:", error)
        return 0;
    }
    const dateOrderCount: Record<string, {total:0, count:0}> = {};
    let avgOrderPerDay: 0;
    data.forEach((item) => {
        const createdAt = item.created_at;
        const price = item.price;
        let timestampString = String(createdAt)
        let date = timestampString.slice(0,10)
        if (!dateOrderCount[date]){
            dateOrderCount[date] = {total:0 ,count:0}
        }
        dateOrderCount[date].total += price;
        dateOrderCount[date].count ++;
    })

    const avgOrderPerDayList: Record<string, number> = {};

    for (const date in dateOrderCount){
        const{total, count} = dateOrderCount[date];
        avgOrderPerDay = total / count;
        avgOrderPerDayList[date] = (avgOrderPerDayList[date] || 0) + avgOrderPerDay;
    }

    return avgOrderPerDayList;

}

// Returns a list of items and the average quantity when said item is ordered
export async function avgQuantityPerItemInOrder(){
    const {data, error} = await catalogSupabase
    .from("orders").select("item_id, quantity")
    if (error){
        console.log("Error fetching orders:", error)
        return 0;
    }

    const itemQuantityStore: Record<number, {total:0, count:0}> = {};

    data.forEach((item) => {
        const itemId = item.item_id;
        const quantity = item.quantity;
        if (!itemQuantityStore[itemId]){
            itemQuantityStore[itemId] = {total:0, count:0};
        }
        itemQuantityStore[itemId].total += quantity;
        itemQuantityStore[itemId].count ++;
    })

    const avgQuantityList: Record<number, number> = {};
    let quanAvg: 0;

    for (const itemId in itemQuantityStore){
        const{total, count} = itemQuantityStore[itemId];
        quanAvg = total / count;
        avgQuantityList[itemId] = (avgQuantityList[itemId] || 0) + quanAvg;
    }

    return avgQuantityList;

}
