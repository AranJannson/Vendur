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

// Product with most reviews
export async function mostReviewedProduct(){
    const { data, error } = await catalogSupabase
        .from("reviews")
        .select("id, item:items!id (id, name)");

    if (error){
        console.error("Error fetching items:", error);
        return 0;
    }

    let total = 0;
    const reviewCount: Record<number, number> = {};
    data.forEach((item) => {
        console.log(item.item);
        // Checks if item.item (price) is an array or object and acts accordingly
        const id = Array.isArray(item.item)
            ? (item.item as { id: number }[])[0]?.id
            : (item.item as { id: number }).id;
        const name = Array.isArray(item.item)
            ? (item.item as { name: string }[])[0]?.name
            : (item.item as { name: string }).name;
        if (id){
            reviewCount[id] = (reviewCount[id] || 0) + 1
        }
    })
    let mostReviewedItem: string | null = null;
    let maxCount = 0;
    for (const category in reviewCount) {
        if (reviewCount[category] > maxCount) {
            mostReviewedItem = category;
            maxCount = reviewCount[category];
        }
    }
    return mostReviewedItem ? { id : mostReviewedItem, count: maxCount } : null;
}

// List of products ranked from the highest average review to the lowest average review
export async function productsByReviewValue(){
    const {data, error} = await catalogSupabase
        .from("reviews")
        .select("id, item:items!id (id, name, rating)");

    if (error){
        console.log("Error fetching reviews:", error);
        return 0;
    }

    const ReviewCount: Record<number, number> = {};

    data.forEach((item) => {
        const id = Array.isArray(item.item)
            ? (item.item as { id: number }[])[0]?.id
            : (item.item as { id: number }).id;
        const name = Array.isArray(item.item)
            ? (item.item as { name: string }[])[0]?.name
            : (item.item as { name: string }).name;
        const rating = Array.isArray(item.item)
            ? (item.item as { rating: number }[])[0]?.rating
            : (item.item as { rating: number }).rating;

    })

}

export async function highestReviewedProduct(){

}
