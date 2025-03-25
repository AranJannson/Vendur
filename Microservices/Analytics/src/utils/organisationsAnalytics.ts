import { createClient } from "@supabase/supabase-js";

const catalogSupabase = createClient(
    process.env.CATALOUGE_SUPABASE_URL as string,
    process.env.CATALOUGE_SUPABASE_ANON_KEY as string
);

const analyticsSupabase = createClient(
    process.env.PUBLIC_SUPABASE_URL as string,
    process.env.PUBLIC_SUPABASE_ANON_KEY as string
);



export async function listOfOrgInvValue() {
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

export async function averageOrganisationProductRating(){

    const itemOrgQuery = await catalogSupabase
    .from("items")
    .select("id, org:organisations!org_id (id)");

    if (itemOrgQuery.error) {
        console.error("Error fetching organisations:", itemOrgQuery.error);
        return 0;
    }

    const reviewQuery = await catalogSupabase
    .from("reviews")
    .select("id, item_id, rating")

    if (reviewQuery.error) {
        console.error("Error fetching stock:", reviewQuery.error);
        return 0;
    }

    const reviewData = reviewQuery.data
    const itemOrgData = itemOrgQuery.data;
    const reviewResults = reviewData.map(review=>({
        [review.item_id]: review.rating
    }))

    const itemOrgTable: Record<number, number> = {};


    itemOrgData.forEach((item)=>{
        const itemId = item.id;
        const orgId = Array.isArray(item.org)
        ? (item.org as { id: number }[])[0]?.id 
        : (item.org as { id: number }).id;
        if (itemId){
            itemOrgTable[itemId] = orgId;        
        }
        
    })

    // for (const entry of reviewResults){
    //     const reviewItemId = Object.keys(entry)[0];
    //     const rating = Object.values(entry);
    //     itemOrgTable.map(callback[, ])
    // }

    const combinedResults = reviewResults.map(entry => {
        // Each entry is an object with a single key-value pair.
        const reviewItemIdStr = Object.keys(entry)[0]; // item id as string
        const rating = Object.values(entry)[0]; // rating number
        const reviewItemId = Number(reviewItemIdStr);
        
        // Lookup org id for this item id in itemOrgTable
        const orgId = itemOrgTable[reviewItemId];
    
        return { itemId: reviewItemId, orgId, rating };
      });

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


      return orgAggregates;



}

