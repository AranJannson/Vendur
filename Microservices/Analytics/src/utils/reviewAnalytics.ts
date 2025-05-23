import {createClient} from "@supabase/supabase-js";
import { reduceEachTrailingCommentRange } from "typescript";

const catalogSupabase = createClient(
    process.env.CATALOUGE_SUPABASE_URL as string,
    process.env.CATALOUGE_SUPABASE_ANON_KEY as string
);

const analyticsSupabase = createClient(
    process.env.PUBLIC_SUPABASE_URL as string,
    process.env.PUBLIC_SUPABASE_ANON_KEY as string
);

// Returns a list of days and how many reviews were done on the day sitewide
export async function listOfReviewsPerDay(){
    const {data, error} = await catalogSupabase
        .from("reviews")
        .select("id, rating, created_at, item:items!id (id)")

    if (error){
        console.log("Error fetching reviews:", error);
        return 0;
    }

    const dateCount: Record<string, number> = {};

    data.forEach((item) => {
        const created_at = item.created_at;
        let timestampString = String(created_at)
        let date = timestampString.slice(0,10)
        if (date) {
            dateCount[date] = (dateCount[date] || 0) + 1;
        }


})
    return dateCount;
}

// Returns a list of days and how many reviews were done on the day
export async function orgListOfReviewsPerDay(org_id: string) {
    const itemQuery = await catalogSupabase
        .from("items")
        .select("id")
        .eq("org_id", org_id);

    if (itemQuery.error) {
        console.error("Error fetching items for org:", itemQuery.error);
        return {};
    }

    const itemIds = itemQuery.data?.map(item => item.id) ?? [];
    if (itemIds.length === 0) return {};

    const reviewQuery = await catalogSupabase
        .from("reviews")
        .select("created_at")
        .in("item_id", itemIds);

    if (reviewQuery.error) {
        console.error("Error fetching reviews:", reviewQuery.error);
        return {};
    }

    const dateCount: Record<string, number> = {};
    reviewQuery.data.forEach((review) => {
        const date = String(review.created_at).slice(0, 10); // Format: YYYY-MM-DD
        if (date) {
            dateCount[date] = (dateCount[date] || 0) + 1;
        }
    });

    return dateCount;
}


