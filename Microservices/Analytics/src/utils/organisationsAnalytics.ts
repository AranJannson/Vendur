import { createClient } from "@supabase/supabase-js";

const catalogSupabase = createClient(
    process.env.CATALOUGE_SUPABASE_URL as string,
    process.env.CATALOUGE_SUPABASE_ANON_KEY as string
);

const analyticsSupabase = createClient(
    process.env.PUBLIC_SUPABASE_URL as string,
    process.env.PUBLIC_SUPABASE_ANON_KEY as string
);


// Returns a list of organisations and their respective amount for inventory value
export async function listOfAllOrgInvValue() {
    const orgQuery = await catalogSupabase
        .from("items")
        .select("id,price, org:organisations!org_id (name)");

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
        const orgName = Array.isArray(item.org)
            ? (item.org as { name: string }[])[0]?.name
            : (item.org as { name: string }).name;
        const itemInvValue = quantity * price;
        orgInventoryMap[orgName] = (orgInventoryMap[orgName] || 0) + itemInvValue;
    })

    return orgInventoryMap;
}

// Returns a list of organisations and their respective amount for inventory value
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
            const orgId = item.org_id;
            if (discount!=null){
                completePrice = price * actualDiscountValue;
            } else {
                completePrice = price;
            }

                orgInventoryMap[itemId] = (orgInventoryMap[itemId] || 0) + completePrice;

        })

        let finalItemStockPrice = 0;
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

// Returns a list of organisations and their respective amount for inventory value
export async function dummyOrgInvValue() {
    const orgQuery = await catalogSupabase
        .from("items")
        .select("id,price,discount,org_id");

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
        const stockData = stockQuery.data;

        let completePrice = 0;
        let actualDiscountValue = 0;
        const orgInventoryMap: Record<string, number>={};

        orgData.forEach((item) => {
            const itemId = item.id;
            const price = item.price;
            const discount = item.discount;
            actualDiscountValue = (100 - discount)/100;
            const orgId = item.org_id;
            if (discount!=null){
                completePrice = price * actualDiscountValue;
            } else {
                completePrice = price;
            }
            if (orgId=="67196320-d732-4135-a5b8-1b55fe125235"){
                orgInventoryMap[itemId] = (orgInventoryMap[itemId] || 0) + completePrice;
            }
        })

        let finalItemStockPrice = 0;
        const orgFinalItemStockMap: Record<string, number>={};

        stockData.forEach((item) => {
            const stockItemId = item.item_id;
            const quantity = item.quantity;
            for (const key in orgInventoryMap) {
                if (key == stockItemId){
                    const itemPrice = orgInventoryMap[key];
                    finalItemStockPrice = itemPrice * quantity;
                    orgFinalItemStockMap[stockItemId] = (orgFinalItemStockMap[stockItemId] || 0) + finalItemStockPrice;
                }
            }
        })
        return orgFinalItemStockMap
    }
}

// Returns a list of organisations and the average review for each organisation
export async function averageOrganisationProductRating() {
    const itemOrgQuery = await catalogSupabase
      .from("items")
      .select("id, org:organisations!org_id (id)");
  
    if (itemOrgQuery.error) {
      console.error("Error fetching organisations:", itemOrgQuery.error);
      return 0;
    }
  
    const reviewQuery = await catalogSupabase
      .from("reviews")
      .select("id, item_id, rating");
  
    if (reviewQuery.error) {
      console.error("Error fetching stock:", reviewQuery.error);
      return 0;
    }
  
    const reviewData = reviewQuery.data;
    const itemOrgData = itemOrgQuery.data;
  
    //Maps item id to organisation id
    const itemOrgTable: Record<number, number> = {};
    itemOrgData.forEach((item) => {
      const itemId = item.id;
      const orgId = Array.isArray(item.org)
        ? (item.org as { id: number }[])[0]?.id
        : (item.org as { id: number }).id;
      if (itemId) {
        itemOrgTable[itemId] = orgId;
      }
    });
  
    //Links organisation ids to review data via item id
    const combinedResults = reviewData.map((review) => {
      const reviewItemId = review.item_id;
      const rating = review.rating;
      const orgId = itemOrgTable[reviewItemId];
      return { itemId: reviewItemId, orgId, rating };
    });
  
    //Adds total ratings and number of reviews (count) per organisation
    const orgAggregates: Record<number, { total: number; count: number }> = {};
    for (const result of combinedResults) {
      const { orgId, rating } = result;
      if (orgId !== undefined) {
        if (!orgAggregates[orgId]) {
          orgAggregates[orgId] = { total: 0, count: 0 };
        }
        orgAggregates[orgId].total += rating;
        orgAggregates[orgId].count++;
      }
    }
  
    // Calculates average rating per organisation
    const orgAverages: Record<number, number> = {};
    for (const orgId in orgAggregates) {
      const { total, count } = orgAggregates[orgId];
      orgAverages[Number(orgId)] = total / count;
    }
  
    return orgAverages;
  }
//Returns a list of organisations and the number of sales each respective organisation has had in descending order
export async function orgNumberOfSales(){
    const orderQuery = await catalogSupabase
        .from("orders")
        .select("id, item:items!id(org_id)")

    if (orderQuery.error) {
        console.error("Error fetching order:", orderQuery.error);
        return 0;
    }

    const orderData = orderQuery.data;

    const orgSalesCount: Record<string, number> = {};

    orderData.forEach((item) => {
        const org_id = Array.isArray(item.item)
            ? (item.item as { org_id: number }[])[0]?.org_id
            : (item.item as { org_id: number }).org_id;
        if (org_id){
            orgSalesCount[org_id] = (orgSalesCount[org_id] || 0) + 1;
        }
    })

    return Object.entries(orgSalesCount)
        .sort((a, b) => b[1] - a[1]);
}

// Returns a list of each organisation and how much total revenue they have made
export async function orgTotalRevenueList(){
    const orderQuery = await catalogSupabase
        .from("orders")
        .select("price, item:items!id(org_id)")

    if (orderQuery.error) {
        console.error("Error fetching order:", orderQuery.error);
        return 0;
    }

    const orderData = orderQuery.data;

    const orgOrderValueList: Record<number, number> = {};
    orderData.forEach((item) => {
        const price = item.price;
        const org_id = Array.isArray(item.item)
            ? (item.item as { org_id: number }[])[0]?.org_id
            : (item.item as { org_id: number }).org_id;
        if (org_id){
           orgOrderValueList[org_id] = (orgOrderValueList[org_id] || 0) + price;
        }
    })

    return Object.entries(orgOrderValueList)
        .sort((a, b) => b[1] - a[1]);
}

// Returns a list of organisations and how the average order value for each
export async function orgAverageOrderValue(){
    const orderQuery = await catalogSupabase
        .from("orders")
        .select("price, item:items!id(org_id)")

    if (orderQuery.error) {
        console.error("Error fetching order:", orderQuery.error);
        return 0;
    }

    const orderData = orderQuery.data;

    const orgPriceOrderCountTable: Record<number, { total: number; count: number }> = {};

    orderData.forEach((item) => {
        const price = item.price;
        const org_id = Array.isArray(item.item)
            ? (item.item as { org_id: number }[])[0]?.org_id
            : (item.item as { org_id: number }).org_id;
        if (org_id !== undefined) {
            if (!orgPriceOrderCountTable[org_id]) {
                orgPriceOrderCountTable[org_id] = { total: 0, count: 0 };
            }
            orgPriceOrderCountTable[org_id].total += price;
            orgPriceOrderCountTable[org_id].count++;
        }
    })

    let avgOrderValue = 0;
    const orgOrderAvgList: Record<number, number> = {};
    const orderAverage  =[];

    for (const orgId in orgPriceOrderCountTable){
        const { total, count } = orgPriceOrderCountTable[orgId];
        avgOrderValue = total / count;
        orderAverage.push(avgOrderValue);
        orgOrderAvgList[orgId] = (orgOrderAvgList[orgId] || 0) + avgOrderValue;
    }


    return Object.entries(orgOrderAvgList)
        .sort((a, b) => b[1] - a[1]);
}
  

