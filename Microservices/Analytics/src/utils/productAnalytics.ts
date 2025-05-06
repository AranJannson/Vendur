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
const paymentSupabase = createClient(
    process.env.PAYMENT_SUPABASE_URL as string,
    process.env.PAYMENT_SUPABASE_ANON_KEY as string
)

// !!!!!!!!!!! Organisation Management !!!!!!!!!!!!!!!!!
// Returns list of org categories by number of items listed with category
export async function mostPopularCategoryByItemsListed(org_id: string) {
    const { data, error } = await catalogSupabase.from("items").select("category").eq("org_id", org_id)

    if (error) {
        console.error("Error fetching items:", error);
        return error;
    }

    if (data.length<2){
        return data
    } else {
        const categoryCount: Record<string, number> = {};

        data.forEach((item) => {
            const category = item.category;
            if (category) {
                categoryCount[category] = (categoryCount[category] || 0) + 1;
            }
        });

        // Return the most frequent category and its count
        return categoryCount;
    }
}

// Returns a list of all categories and the average price of an item in each category
export async function avgItemPricePerCategory(org_id: string){
    const {data, error} = await catalogSupabase
        .from("items")
        .select("category, price, org_id").eq("org_id", org_id)

    if (error){
        console.log("Error fetching items:", error);
        return 0;
    }

    if (data.length<2){
        return data;

    } else {
        const categoryCount: Record<string, {total:0, price:0}>={};
        data.forEach((item) => {
            const category = item.category;
            const price = item.price;
            const orgId = item.org_id;
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
}

// Returns a list of all org categories and the number of sales/orders there have been with/involving it
export async function orgCategoriesBySales(org_id: string) {

}

// Returns a list of all org products and the number of sales/orders there have been with/involving it
export async function orgProductsBySales(org_id: string) {

}

// !!!!!!!!!!!!!! Admin !!!!!!!!!!!!!!!!!

// Returns list of categories by number of items listed with category
export async function categoriesByItemsListed() {
    const { data, error } = await catalogSupabase.from("items").select("category")

    if (error) {
        console.error("Error fetching items:", error);
        return error;
    }

    if (data.length<2){
        return data
    } else {
        const categoryCount: Record<string, number> = {};

        data.forEach((item) => {
            const category = item.category;
            if (category) {
                categoryCount[category] = (categoryCount[category] || 0) + 1;
            }
        });

        // Return the most frequent category and its count
        return categoryCount;
    }
}

// Returns list of categories by average price of an item in the category
export async function categoriesByAverageItemPrice(){
    const {data, error} = await catalogSupabase
        .from("items")
        .select("category, price, org_id")

    if (error){
        console.log("Error fetching items:", error);
        return 0;
    }

    if (data.length<2){
        return data;

    } else {
        const categoryCount: Record<string, {total:0, price:0}>={};
        data.forEach((item) => {
            const category = item.category;
            const price = item.price;
            const orgId = item.org_id;
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
}

// Returns a list of all categories and the number of sales/orders there have been with/involving it
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

export async function top5ProductsBySales() {
    const { data, error } = await paymentSupabase
        .rpc('get_top_5_products_by_sales')

    if (error) {
        console.error("Error fetching top 5 products by sales:", error);
        return null;
    }
    return data;
}

export async function get_category_sales_summary() {
    const { data, error } = await paymentSupabase
        .rpc('get_category_sales_summary')

    if (error) {
        console.error("Error fetching category sales summary:", error);
        return null;
    }
    return data;
}