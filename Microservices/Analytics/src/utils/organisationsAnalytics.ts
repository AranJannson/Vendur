import { createClient } from "@supabase/supabase-js";

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
);

// Returns list of items from an org and their item stock value (item price x stock)
export async function orgInvValue(org_id: string) {
    const orgQuery = await catalogSupabase
        .from("items")
        .select("id,name, price,discount,org_id").eq("org_id", org_id);

    if (orgQuery.error) {
        console.error("Error fetching organisations:", orgQuery.error);
        return 0;
    }

    const stockQuery = await catalogSupabase
        .from("stock")
        .select("item_id, quantity");

    if (stockQuery.error) {
        console.error("Error fetching stock:", stockQuery.error);
        return 0;
    }

    if (orgQuery.data.length<2){
        return orgQuery.data
    } else {
        const orgData = orgQuery.data;
        const idToItemName: Record<string, string>={};
        orgData.forEach((item) => {
            idToItemName[item.id] = item.name;
        })
        const stockData = stockQuery.data;

        let completePrice = 0;
        let actualDiscountValue = 0;
        const orgInventoryMap: Record<string, number>={};

        orgData.forEach((item) => {
            const itemId = item.id;
            const price = item.price;
            const discount = item.discount;
            actualDiscountValue = (100 - discount)/100;
            if (discount!=null){
                completePrice = price * actualDiscountValue;
            } else {
                completePrice = price;
            }
            orgInventoryMap[itemId] = (orgInventoryMap[itemId] || 0) + completePrice;
        })
        const finalNameStockMap: Record<string, number> = {};
        stockData.forEach((item) => {
            const stockItemId = item.item_id;
            const quantity = item.quantity;

            if (orgInventoryMap[stockItemId] !== undefined) {
                const itemPrice = orgInventoryMap[stockItemId];
                const itemName = idToItemName[stockItemId]; // Use name instead of id now
                finalNameStockMap[itemName] = (finalNameStockMap[itemName] || 0) + (itemPrice * quantity);
            }
        });

        return finalNameStockMap;
    }
}

// Returns list of items from an org and their average rating
export async function orgProductRatingList(org_id: string): Promise<Record<string, number>> {
    const itemQuery = await catalogSupabase
        .from("items")
        .select("id, name, org_id")
        .eq("org_id", org_id);

    if (itemQuery.error) {
        console.error("Error fetching organisation items:", itemQuery.error);
        return {};
    }

    if (!itemQuery.data || itemQuery.data.length < 1) {
        return {};
    }

    const itemData = itemQuery.data;
    const idToItemName: Record<string, string> = {};
    itemData.forEach((item) => {
        idToItemName[item.id] = item.name;
    });

    const reviewQuery = await catalogSupabase
        .from("reviews")
        .select("item_id, rating");

    if (reviewQuery.error) {
        console.error("Error fetching reviews:", reviewQuery.error);
        return {};
    }

    const reviewData = reviewQuery.data;

    const reviewSum: Record<string, number> = {};
    const reviewCount: Record<string, number> = {};

    reviewData.forEach((review) => {
        const itemId = review.item_id;
        const rating = review.rating;

        if (itemId in idToItemName) {
            const itemName = idToItemName[itemId];
            reviewSum[itemName] = (reviewSum[itemName] || 0) + rating;
            reviewCount[itemName] = (reviewCount[itemName] || 0) + 1;
        }
    });

    const reviewAverage: Record<string, number> = {};
    for (const itemName in reviewSum) {
        reviewAverage[itemName] = reviewSum[itemName] / reviewCount[itemName];
    }

    return reviewAverage;
}

// Returns a list of items from one org and how many sales each item has been a part of
export async function oneOrgItemSalesAnalytics(org_id: string) {
    const paymentQuery = await paymentSupabase
        .from("orders")
        .select("item_id");

    if (paymentQuery.error) {
        console.error("Error fetching orders:", paymentQuery.error);
        return {};
    }

    const paymentData = paymentQuery.data;

    const itemOrderFrequencyMap: Record<number, number> = {};
    paymentData.forEach((item) => {
        const itemId = item.item_id;
        if (itemId) {
            itemOrderFrequencyMap[itemId] = (itemOrderFrequencyMap[itemId] || 0) + 1;
        }
    });

    const itemQuery = await catalogSupabase
        .from("items")
        .select("id, name")
        .eq("org_id", org_id);

    if (itemQuery.error) {
        console.error("Error fetching items:", itemQuery.error);
        return {};
    }

    const itemData = itemQuery.data;

    const orgSalesMap: Record<string, number> = {};

    itemData.forEach((item) => {
        const itemId = item.id;
        const itemName = item.name;
        const count = itemOrderFrequencyMap[itemId] || 0;
        orgSalesMap[itemName] = count;
    });

    return orgSalesMap;
}


// Returns a list of items from one org and how many sales each item has been a part of
export async function oneOrgItemRevenueAnalytics(org_id: string) {
    const paymentQuery = await paymentSupabase
        .from("orders")
        .select("item_id, quantity");

    if (paymentQuery.error) {
        console.error("Error fetching order data:", paymentQuery.error);
        return {};
    }

    const paymentData = paymentQuery.data;

    const itemOrderQuantityList: { itemId: number, quantity: number }[] = [];

    paymentData.forEach((item) => {
        if (item.item_id && item.quantity) {
            itemOrderQuantityList.push({
                itemId: item.item_id,
                quantity: item.quantity
            });
        }
    });

    const itemQuery = await catalogSupabase
        .from("items")
        .select("id, name, price")
        .eq("org_id", org_id);

    if (itemQuery.error) {
        console.error("Error fetching item data:", itemQuery.error);
        return {};
    }

    const itemData = itemQuery.data;

    const itemPriceMap: Record<number, number> = {};
    const itemNameMap: Record<number, string> = {};

    itemData.forEach((item) => {
        itemPriceMap[item.id] = item.price;
        itemNameMap[item.id] = item.name;
    });

    const revenueByItemName: Record<string, number> = {};

    for (const entry of itemOrderQuantityList) {
        const price = itemPriceMap[entry.itemId];
        const name = itemNameMap[entry.itemId];
        if (price !== undefined && name) {
            const revenue = price * entry.quantity;
            revenueByItemName[name] = (revenueByItemName[name] || 0) + revenue;
        }
    }

    return revenueByItemName;
}

// !!!!!!!!!!!!!!!!!!!! Admin Analytics !!!!!!!!!!!!!!!!!!!!!

// Returns a list of organisations and their respective amount for inventory value
export async function listOfAllOrgInvValue() {
    const orgQuery = await catalogSupabase
        .from("items")
        .select("id,price, org_id");

    if (orgQuery.error) {
        console.error("Error fetching organisations:", orgQuery.error);
        return 0;
    }

    const stockQuery = await catalogSupabase
        .from("stock")
        .select("item_id, quantity");

    if (stockQuery.error) {
        console.error("Error fetching stock:", stockQuery.error);
        return 0;
    }

    const orgData = orgQuery.data;
    const stockData = stockQuery.data;

    const stockMap: Record<string, number>={}
    stockData.forEach((item) => {
        const itemId = item.item_id;
        stockMap[itemId] = item.quantity;
    })

    const orgInventoryMap: Record<string, number>={};

    orgData.forEach((item) => {
        const quantity = stockMap[item.id]
        const price = item.price
        const orgName = item.org_id

        if (quantity == undefined){
            console.warn("Item doesn't exist", item);
            return;
        }

        const itemInvValue = quantity * price;
        orgInventoryMap[orgName] = (orgInventoryMap[orgName] || 0) + itemInvValue;
    })

    return orgInventoryMap;
}

// Returns a list of organisations and their respective average rating across their products
export async function averageOrganisationProductRating() {
    const { data, error } = await catalogSupabase
        .rpc('average_org_product_ratings')

    if (error) {
        console.error('RPC Error', error)
        return []
    }

    return data
}

export async function orgsTotalInventory(){

}

//Returns a list of organisations and the number of sales each respective organisation has had
export async function orgNumberOfSales() {
    const orderQuery = await paymentSupabase
        .from("orders")
        .select("item_id");

    if (orderQuery.error) {
        console.error("Error fetching order:", orderQuery.error);
        return 0;
    }

    const orderData = orderQuery.data;

    const itemQuery = await catalogSupabase
        .from("items")
        .select("id, org_id");

    if (itemQuery.error) {
        console.error("Error fetching item:", itemQuery.error);
        return 0;
    }

    const itemData = itemQuery.data;

    const orgItems: Record<number, string> = {};
    itemData.forEach((item) => {
        orgItems[item.id] = item.org_id;
    });

    const orgSalesCount: Record<string, number> = {};
    orderData.forEach((order) => {
        const orgId = orgItems[order.item_id];
        if (orgId) {
            orgSalesCount[orgId] = (orgSalesCount[orgId] || 0) + 1;
        }
    });

    return orgSalesCount;
}

// Returns a list of each organisation and how much total revenue they have made
export async function orgTotalRevenueList(){
    const orderQuery = await paymentSupabase
        .from("orders")
        .select("item_id, quantity")

    if (orderQuery.error) {
        console.error("Error fetching order:", orderQuery.error);
        return 0;
    }

    const itemOrderQuantityList: {itemId: number, quantity: number}[] = [];

    const orderData = orderQuery.data;
    orderData.forEach((item) => {
        const itemId = item.item_id
        const quantity = item.quantity
        itemOrderQuantityList.push({itemId: itemId, quantity: quantity});
    })

    const itemQuery = await catalogSupabase
        .from("items")
        .select("id, price, discount, org_id")

    if (itemQuery.error){
        console.error("Error fetching item:", itemQuery.error);
        return 0;
    }

    const itemData = itemQuery.data
    const orgItems: Record<number, {price: number; orgId: string}> = {};
    let finalPrice = 0
    itemData.forEach((item) => {
        const itemId = item.id
        const price = item.price
        const discount = item.discount
        const orgId = item.org_id
        if (discount!=null){
            finalPrice=price*(1-(discount/100))
        } else {
            finalPrice=price
        }
        orgItems[itemId] = {
            price: finalPrice,
            orgId: orgId
        }
    })

    let orderPrice = 0;
    const allOrgRevenue: Record<string, number> = {};
    for (const order of itemOrderQuantityList){
        const orderItemId = order.itemId
        const quantity = order.quantity;
        for (const [key, data] of Object.entries(orgItems)) {
            const itemId = Number(key)
            const price = data.price
            const orgId = data.orgId
            orderPrice = price * quantity
            if (orderItemId==itemId){
                allOrgRevenue[orgId] = (allOrgRevenue[orgId] || 0) + orderPrice;
            }
        }
    }

    return allOrgRevenue;

}

// Returns a list of organisations and how the average order value for each
export async function orgsAverageOrderValue() {
    const orderQuery = await paymentSupabase
        .from("orders")
        .select("item_id, group_id");

    if (orderQuery.error) {
        console.error("Error fetching order:", orderQuery.error);
        return 0;
    }

    const orderData = orderQuery.data;
    const itemGroupMap: { itemId: number, groupId: number }[] = [];
    orderData.forEach((item) => {
        const itemId = item.item_id;
        const groupId = item.group_id;
        itemGroupMap.push({ itemId, groupId });
    });

    const groupIdMap: Record<number, { itemId: number }[]> = {};
    itemGroupMap.forEach((item) => {
        const groupId = item.groupId;
        const itemId = item.itemId;
        if (!groupIdMap[groupId]) {
            groupIdMap[groupId] = [];
        }
        groupIdMap[groupId].push({ itemId });
    });

    const itemQuery = await catalogSupabase
        .from("items")
        .select("id, price, discount, org_id");

    if (itemQuery.error) {
        console.error("Error fetching item:", itemQuery.error);
        return 0;
    }

    const itemData = itemQuery.data;

    // Map each itemId to its price, discount, and org
    const itemDetailsMap: Record<number, { price: number, discount: number, orgId: string }> = {};
    itemData.forEach((item) => {
        itemDetailsMap[item.id] = {
            price: item.price,
            discount: item.discount,
            orgId: item.org_id
        };
    });

    // Map to hold total value and order count per org
    const orgOrderTotals: Record<string, { totalValue: number, orderCount: number }> = {};

    for (const groupId in groupIdMap) {
        let groupTotal = 0;
        let orgId: string | null = null;

        for (const { itemId } of groupIdMap[Number(groupId)]) {
            const itemDetails = itemDetailsMap[itemId];
            if (!itemDetails) continue;

            const { price, discount, orgId: itemOrgId } = itemDetails;
            groupTotal += price * (1 - discount);
            orgId = itemOrgId; // assume all items in the group belong to the same org
        }

        if (orgId) {
            if (!orgOrderTotals[orgId]) {
                orgOrderTotals[orgId] = { totalValue: 0, orderCount: 0 };
            }
            orgOrderTotals[orgId].totalValue += groupTotal;
            orgOrderTotals[orgId].orderCount += 1;
        }
    }

    // Calculate average order value per org
    const orgAvgOrderValues: Record<string, number> = {};
    for (const orgId in orgOrderTotals) {
        const { totalValue, orderCount } = orgOrderTotals[orgId];
        orgAvgOrderValues[orgId] = totalValue / orderCount;
    }

    return orgAvgOrderValues;
}


  

