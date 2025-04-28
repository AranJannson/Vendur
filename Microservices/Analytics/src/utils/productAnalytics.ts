import {createClient} from "@supabase/supabase-js";
import {inventoryValue, listOfItemStockValue} from "./stockAnalysis";

const supabase = createClient(process.env.PUBLIC_SUPABASE_URL as string, process.env.PUBLIC_SUPABASE_ANON_KEY as string);

const catalogSupabase = createClient(
    process.env.CATALOUGE_SUPABASE_URL as string,
    process.env.CATALOUGE_SUPABASE_ANON_KEY as string
);

const analyticsSupabase = createClient(
    process.env.PUBLIC_SUPABASE_URL as string,
    process.env.PUBLIC_SUPABASE_ANON_KEY as string
);

// Returns list of categories by number of items listed with category
export async function mostPopularCategoryByItemsListed() {
    const { data, error } = await catalogSupabase.from("items").select("category");

    if (error) {
        console.error("Error fetching items:", error);
        return null;
    }

    const categoryCount: Record<string, number> = {};

    data.forEach((item) => {
        const category = item.category;
        if (category) {
            categoryCount[category] = (categoryCount[category] || 0) + 1;
        }
    });

    let mostFrequentCategory: string | null = null;
    let maxCount = 0;

    for (const category in categoryCount) {
        if (categoryCount[category] > maxCount) {
            mostFrequentCategory = category;
            maxCount = categoryCount[category];
        }
    }

    // Return the most frequent category and its count
    return mostFrequentCategory ? { category: mostFrequentCategory, count: maxCount } : null;
}

// Returns a list of all categories in descending order of number of sales
export async function mostPopularCategoryBySalesList() {
    const { data, error } = await catalogSupabase.from("orders").select("price, item:items!id (name, category)");

    if (error) {
        console.error("Error fetching items:", error);
        return null;
    }

    const categoryCount: Record<string, number> = {};

    data.forEach((item) => {
        const category = Array.isArray(item.item)
            ? (item.item as { category: string }[])[1]?.category
            : (item.item as { category: string }).category;
        if (category) {
            categoryCount[category] = (categoryCount[category] || 0) + 1;
        }
    });


    return Object.entries(categoryCount)
        .sort((a, b) => b[1] - a[1]);
}
// Returns a list of products in descending order of number of sales
export async function itemSalesList() {
    const { data, error } = await catalogSupabase.from("orders").select("item_id, item:items!id(name)");

    if (error) {
        console.error("Error fetching items:", error);
        return null;
    }

    // Create a frequency map with explicit type definition
    const itemCount: Record<string, number> = {};

    data.forEach((item) => {

        const itemId = item.item_id;
        const name = Array.isArray(item.item)
            ? (item.item as { name: string }[])[0]?.name
            : (item.item as { name: string }).name;
        if (itemId) {
            itemCount[name] = (itemCount[name] || 0) + 1;
        }
    });


    return Object.entries(itemCount)
        .sort((a, b) => b[1] - a[1]);
}

// Returns a list of all categories and the average price of an item in each category
export async function oldAvgItemPricePerCategory(){
    const {data, error} = await catalogSupabase
        .from("items")
        .select("category, price")

    if (error){
        console.log("Error fetching items:", error);
        return 0;
    }
    const categoryCount: Record<string, {total:0, price:0}>={};
    data.forEach((item) => {
        const category = item.category;
        const price = item.price;
        if(!categoryCount[category]){
            categoryCount[category] ={total:0, price:0}
        }
        categoryCount[category].total+=1;
        categoryCount[category].price+=price;
    })

    const avgItemCategoryPrice: Record<string, number> = {};
    let avg: 0

    for (const category in categoryCount){
        const{total, price} = categoryCount[category];
        avg = price / total;
        avgItemCategoryPrice[category] =(avgItemCategoryPrice[category] || 0) + avg;
    }

    return avgItemCategoryPrice;
}

// Returns a list of all categories and the average price of an item in each category
export async function avgItemPricePerCategory(org_id: string){
    const {data, error} = await catalogSupabase
        .from("items")
        .select("category, price, org_id")

    if (error){
        console.log("Error fetching items:", error);
        return 0;
    }
    const categoryCount: Record<string, {total:0, price:0}>={};
    data.forEach((item) => {
        const category = item.category;
        const price = item.price;
        const orgId = item.org_id;
        if (orgId == org_id){

        }
        if(!categoryCount[category] && orgId == org_id){
            categoryCount[category] ={total:0, price:0}
        }
        categoryCount[category].total+=1;
        categoryCount[category].price+=price;
    })

    const avgItemCategoryPrice: Record<string, number> = {};
    let avg: 0

    for (const category in categoryCount){
        const{total, price} = categoryCount[category];
        avg = price / total;
        avgItemCategoryPrice[category] =(avgItemCategoryPrice[category] || 0) + avg;
    }

    return avgItemCategoryPrice;
}



