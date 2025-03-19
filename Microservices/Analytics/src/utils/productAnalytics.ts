import {createClient} from "@supabase/supabase-js";

const supabase = createClient(process.env.PUBLIC_SUPABASE_URL as string, process.env.PUBLIC_SUPABASE_ANON_KEY as string);

const catalougeSupabase = createClient(
    process.env.CATALOUGE_SUPABASE_URL as string,
    process.env.CATALOUGE_SUPABASE_ANON_KEY as string
);

const analyticsSupabase = createClient(
    process.env.PUBLIC_SUPABASE_URL as string,
    process.env.PUBLIC_SUPABASE_ANON_KEY as string
);

// export async function popularProductOld() {
//     try {
//         // Fetch count of item_id occurrences
//         const { count} = await supabase
//             .from("orders")
//             .select("item_id")


//         const { data, error } = await supabase
//             .from("orders")
//             .select("item_id") // Select only item_id
//             .count("item_id", { exact: true }) // Count occurrences properly
//             .order("count", { ascending: false }) // Sort by highest count
//             .limit(1); // Get only the most popular product

//         if (error) throw error;
//         if (!data || data.length === 0) return "No orders found.";

//         return data[0]; // Return the most popular product

//     } catch (error) {
//         console.error("Error fetching most popular product:", error);
//         return null;
//     }
// }

export async function popularProduct(){

    try{
        const { data, error } = await catalougeSupabase.from("items").select("item_id", {count:'exact'}).order("item_id");
        // const { data, error } = await supabase.from("items").select("*");
        return data;

    }catch (error){
        console.error(error);
        return 0;
    }
}

export async function everydatabase(){

    try{
        const { data, error } = await supabase.from("orders").select("*");
        return data;

    }catch (error){
        console.error(error);
        return 0;
    }


}




export async function testAllProducts(){

    try{
        const { data, error } = await supabase.from("orders").select("*");
        return data;

    }catch (error){
        console.error(error);
        return 0;
    }


}

export async function catalogItemsCall() {
    // Fetch all rows from the 'items' table, selecting only the 'category' column
    const { data, error } = await catalougeSupabase.from("items").select("category");

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
