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

export async function mostPopularCategory() {
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
