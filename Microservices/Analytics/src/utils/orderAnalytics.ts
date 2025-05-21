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

const paymentSupabase = createClient(
    process.env.PAYMENT_SUPABASE_URL as string,
    process.env.PAYMENT_SUPABASE_ANON_KEY as string
)


// Returns total number of orders
export async function newestTotalSales(){
    const {count, error} = await paymentSupabase
        .from("order_groups")
        .select("*", { count: "exact", head: true });

    if (error){
        console.error("Error fetching sales:", error)
        return null;
    }

    return count;
}

// Returns the total revenue ever
export async function totalRevenueEver() {

    const {data, error} = await paymentSupabase
    .from("orders")
    .select("item_id, quantity")

    if (error){
        console.error("Error fetching items:", error)
        return null;
    }

    let total = 0;
    const itemQuantity: {itemId: number, quantity: number}[] = [];
    data.forEach((item) => {
        const itemId = item.item_id;
        const quantity = item.quantity;
        itemQuantity.push({itemId, quantity});
    })

    const catalogQuery = await catalogSupabase
        .from("items")
    .select("id, price, discount");

    if(catalogQuery.error){
        console.error("Error fetching items:", catalogQuery.error);
        return 0;
    }
    const itemIdPrice: Record<number, number> = {};
    const itemData = catalogQuery.data;
    let finalPrice = 0
    itemData.forEach((item) => {
        const itemId = item.id
        const price = item.price;
        const discount = item.discount;
        if (discount!=null){
            finalPrice = price * (1-(discount/100));
        } else {
            finalPrice = price;
        }
        itemIdPrice[itemId] = (itemIdPrice[itemId] || 0) + finalPrice;
    })
    let totalRevenue = 0
    let orderValue = 0
    itemQuantity.forEach((item) => {
        for (const itemPrice in itemIdPrice){
            const itemId = Number(itemPrice)
            const price = itemIdPrice[itemId];
            if (item.itemId == itemId){
                let orderValue = item.quantity * price;
                totalRevenue+=orderValue;
            }
        }
    })




    return totalRevenue;
}

// Shows list of sales numbers per day (actual number of orders, not order value)
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

export async function orderCountDaily() {
    const paymentQuery = await paymentSupabase
        .from("orders")
    .select("created_at")

    if (paymentQuery.error){
        console.error("Error fetching order count:", paymentQuery.error);
    }

    const itemData = paymentQuery.data;
    const orderDates: string[] = [];

    if (!itemData){
        return 0;
    }

    itemData.forEach(date => {
        const orderDate = date.created_at;
        const newDate = orderDate.slice(0,10)
        orderDates.push(newDate)
    })

    const dateCount: Record<string, number> = {};

    for (const orderDate in orderDates){
        const date = orderDates[orderDate];
        dateCount[date] = (dateCount[date] || 0) + 1;
    }

    return dateCount;
}

// Total order value per day (for which an order was placed)
export async function orderValuePerDayList() {
    const paymentQuery = await paymentSupabase
        .from("orders")
        .select("created_at, item_id, quantity");

    if (paymentQuery.error) {
        console.error("Error fetching items:", paymentQuery.error);
        return null;
    }

    const data = paymentQuery.data;

    const catalogQuery = await catalogSupabase
        .from("items")
        .select("id, price, discount");

    if (catalogQuery.error) {
        console.error("Error fetching catalog:", catalogQuery.error);
        return null;
    }

    const itemIdPrice: Record<number, number> = {};
    catalogQuery.data.forEach((item) => {
        const itemId = item.id;
        const price = item.price;
        const discount = item.discount ?? 0;
        const finalPrice = price * (1 - (discount / 100));
        itemIdPrice[itemId] = finalPrice;
    });

    const orderValuePerDay: Record<string, number> = {};

    data.forEach((order) => {
        const date = String(order.created_at).slice(0, 10);
        const itemId = order.item_id;
        const quantity = order.quantity;

        const price = itemIdPrice[itemId] ?? 0;
        const orderValue = quantity * price;

        orderValuePerDay[date] = (orderValuePerDay[date] || 0) + orderValue;
    });

    return orderValuePerDay;
}

// Total order value per day (for which an order was placed)
export async function averageOrderValuePerDayList() {
    const paymentQuery = await paymentSupabase
        .from("orders")
        .select("created_at, item_id, quantity");

    if (paymentQuery.error) {
        console.error("Error fetching items:", paymentQuery.error);
        return null;
    }

    const data = paymentQuery.data;

    const dateCount: Record<string, number> = {};
    data.forEach((item) => {
        const orderdate = String(item.created_at).slice(0, 10);
        dateCount[orderdate] = (dateCount[orderdate] || 0) + 1;
    })

    const catalogQuery = await catalogSupabase
        .from("items")
        .select("id, price, discount");

    if (catalogQuery.error) {
        console.error("Error fetching catalog:", catalogQuery.error);
        return null;
    }


    const itemIdPrice: Record<number, number> = {};
    catalogQuery.data.forEach((item) => {
        const itemId = item.id;
        const price = item.price;
        const discount = item.discount ?? 0;
        const finalPrice = price * (1 - (discount / 100));
        itemIdPrice[itemId] = finalPrice;
    });

    const orderValuePerDay: Record<string, number> = {};

    data.forEach((order) => {
        const date = String(order.created_at).slice(0, 10);
        const itemId = order.item_id;
        const quantity = order.quantity;

        const price = itemIdPrice[itemId] ?? 0;
        const orderValue = quantity * price;
        for (const orderDate in dateCount){
            if (orderDate == date){
                const count = dateCount[date]
                const averageOrderValue = orderValue/count;
                orderValuePerDay[date] = (orderValuePerDay[date] || 0) + averageOrderValue;
            }
        }


    });

    return orderValuePerDay;
}

