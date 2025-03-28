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

export async function mostPopularCategoryByItemsListed() {
    const { data, error } = await catalogSupabase.from("items").select("category");

    if (error) {
        console.error("Error fetching items:", error);
        return null;
    }

    // Create a frequency map with explicit type definition
    const categoryCount: Record<string, number> = {};

    data.forEach((item) => {
        const category = item.category;
        if (category) {
            categoryCount[category] = (categoryCount[category] || 0) + 1;
        }
    });

    // Find the most mentioned category
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

export async function mostPopularCategoryBySales() {
    const { data, error } = await catalogSupabase.from("orders").select("price, item:items!id (name, category)");

    if (error) {
        console.error("Error fetching items:", error);
        return null;
    }

    // Create a frequency map with explicit type definition
    const categoryCount: Record<string, number> = {};

    data.forEach((item) => {
        const category = Array.isArray(item.item)
            ? (item.item as { category: string }[])[1]?.category
            : (item.item as { category: string }).category;
        if (category) {
            categoryCount[category] = (categoryCount[category] || 0) + 1;
        }
    });

    // Find the most mentioned category
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

export async function mostPopularCategoryBySalesList() {
    const { data, error } = await catalogSupabase.from("orders").select("price, item:items!id (name, category)");

    if (error) {
        console.error("Error fetching items:", error);
        return null;
    }

    // Create a frequency map with explicit type definition
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

export async function avgItemPricePerCategory(){
    const {data, error} = await catalogSupabase
        .from("items, price")
        .select("category")

    if (error){
        console.log("Error fetching items:", error);
        return 0;
    }

    return data;
}

